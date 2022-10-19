import { Response } from "express";
import { auth } from "google-auth-library";
import { AuthenticatedRequest, BaseController, Controller, Get, Post } from "../core";
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

    @Get('/list', { auth: true })
    async list(req: AuthenticatedRequest, res: Response) {
        const service = this.container.get(QuizService);
        const quizzes = await service.getUserQuizzes(req.user.id);
        return res.json(quizzes);
    }

    @Get('/tag/:tag', { auth: true })
    async getByTag(req: AuthenticatedRequest, res: Response) {
        const { tag } = req.params;

        const quiz = await this.container.get(QuizService).getQuizByTag(tag);

        if (quiz) {
            return res.json(quiz);
        }
        return res.sendStatus(404);
    }
}