import { User } from "../models";
import { Quiz } from "../models/quiz.model";

export class QuizService {

    async createQuiz(user: User, data: any): Promise<Quiz | null> {
        //todo: data validation
        
        const quiz = await Quiz.create({
            title: data.title,
            created_by: user.id,
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
}