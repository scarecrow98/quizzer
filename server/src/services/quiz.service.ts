import { User } from "../models";
import { Quiz } from "../models/quiz.model";

export class QuizService {

    async createQuiz(user: User, data: any): Promise<Quiz | null> {
        //todo: data validation
        
        const tag = await this.generateQuizTag();

        const quiz = await Quiz.create({
            title: data.title,
            created_by: user.id,
            tag,
            questions: data.questions.map((item: any) => ({
                question: item.question,
                type: item.type,
                choices: item.type === 'choice' ? item.choices : []
            }))
        }, {
            include: [ Quiz.Questions ]
        });

        // console.log(quiz);
        return quiz;
    }

    async getUserQuizzes(userId: number): Promise<Quiz[]> {
        return await Quiz.findAll({
            where: {
                created_by: userId
            },
            include: [ Quiz.Questions ]
        });
    }

    async getQuizByTag(tag: string): Promise<Quiz | null> {
        return await Quiz.findOne({
            where: {
                tag
            }
        });
    }

    private async generateQuizTag(): Promise<string> {
        //todo: check for tag existence in db
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let tag = '';
        for (let i = 0; i < 6; ++i) {
            tag += chars[Math.floor(Math.random() * chars.length)];
        }

        return Promise.resolve(tag);
    }
}