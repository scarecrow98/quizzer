import { verify as verifyJwt, sign as signJwt } from 'jsonwebtoken';
import { User } from '../models';

export class AuthService {

    createToken(payload: { id: number, email: string }): string {
        return signJwt(payload, process.env.JWT_SECRET || 'secret');
    }

    async checkToken(token: string): Promise<User | null> {
        try {
            const payload = verifyJwt(token, process.env.JWT_SECRET || 'secret') as any;
            return await User.findOne({ where: { id: payload.id } });
        } catch (err) {
            return Promise.resolve(null);
        }
    }

}