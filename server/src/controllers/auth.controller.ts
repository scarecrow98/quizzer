import { Request, Response } from "express";
import { join, resolve } from "path";
import { AuthenticatedRequest, BaseController, Controller, Get, Post } from "../core";
import { User } from "../models";
import { GoogleAuthService, AuthService } from "../services";

@Controller('/auth')
export class AuthController extends BaseController {

	@Get('/')
	index(req: Request, res: Response) {
		return res.sendFile(
			resolve(
                join(__dirname, '..', '..', 'public', 'auth.html')
            )
		);
	}

	@Post('/verify-token')
	async verifyToken(req: Request, res: Response) {
		const { token } = req.body;

		if (!token) {
			return res.json({
				status: false
			});
		}

		const payload = await this.container.get(GoogleAuthService).verifyToken(token);

		if (!payload) {
			return res.status(401).json({
				status: false
			});
		}

		const { name, email } = payload;

		let user = await User.findOne({
			where: { email }
		});

		if (!user) {
			user = new User({
				name,
				email
			});
			await user.save();
		}

		const ourJwtToken = this.container.get(AuthService).createToken({
			id: user.id,
			email: user.email
		});

		res.json({
			status: true,
			data: { user, token: ourJwtToken }
		});
	}

	@Get('/check')
	async check(req: Request, res: Response) {
		const jwt = req.headers.authorization;

		if (!jwt) {
			return res.status(401).json({ status: false });
		}

		//substring to cut 'Bearer ' segment from the header content, and only the JWT itself remains
		const user = await this.container.get(AuthService).checkToken(jwt.substring(7));

		if (!user) {
			return res.status(401).json({ status: false, });
		}
		return res.json({
			status: true,
			data: { user }
		});
	}
}