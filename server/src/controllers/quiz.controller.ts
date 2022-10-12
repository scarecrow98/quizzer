import { Response } from "express";
import { AuthenticatedRequest, BaseController, Controller, Post } from "../core";
import { QuizService } from "../services";

@Controller('/quiz')
export class QuizController extends BaseController {

    @Post('/create', { auth: true })
    async create(req: AuthenticatedRequest, res: Response) {
        const service = this.container.get(QuizService);
        const quiz = await service.createQuiz(req.user, req.body);

        return res.json({
            created: quiz !== null,
            quiz
        });
    }
}