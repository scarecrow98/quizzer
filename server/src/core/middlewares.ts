import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest } from "./types";

export const authMiddleware = (authServive: AuthService, protectedRoutes: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!protectedRoutes.includes(req.path)) {
            return next();
        }

        const jwt = req.headers.authorization;
        if (!jwt) {
            return res.status(401).json({ status :false });
        }

        authServive.checkToken(jwt.substring(7))
            .then(user => {
                if (!user) {
                    return res.status(401).json({ status: false });
                }

                (req as AuthenticatedRequest).user = user;
                next();
            })
            .catch(err => {
                res.status(505).json({ status: false });
            })
    }
}