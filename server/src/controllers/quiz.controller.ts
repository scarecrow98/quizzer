import { Response } from "express";
import { ApiException, AuthenticatedRequest, BaseController, Controller, Get, Post } from "../core";
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

    @Post('/answer/save', { auth: true })
    async saveAnswer(req: AuthenticatedRequest, res: Response) {
        const { questionId, answer } = req.body;
        
        try {
            await this.container.get(QuizService).saveAnswer(req.user.id, questionId, answer);
            res.json({
                status: true
            });
        } catch(err) {
            console.log(err);
            if (err instanceof ApiException) {
                res.status(err.getStatus()).json({
                    status: false,
                    message: err.getMessage()
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'Server error'
                });
            }
        }
    }

    @Get('/answer/user-answers', { auth: true })
    async getQuizUserAnswers(req: AuthenticatedRequest, res: Response) {
        const { quizId } = req.query;

        const answers = await this.container.get(QuizService).getQuizUserAnswers(req.user.id, quizId as any);
        res.send(answers);
    }
}