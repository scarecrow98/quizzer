import { Request, Response } from "express";
import { BaseController, Controller, Get } from "../core";
import { User } from "../models";

@Controller('/main')
export class AuthController extends BaseController {

    @Get('/')
    async get(req: Request, res: Response) {
        return res.json(
          await User.findAll()  
        );
    }
}