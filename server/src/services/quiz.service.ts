import { ApiException } from "../core";
import { Answer, Quiz, QuizQuestion, User } from "../models";

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
            },
            include: [ Quiz.Questions ]
        });
    }

    async saveAnswer(userId: number, questionId: number, answer: any) {
        const question = await QuizQuestion.findOne({ where: { id: questionId } });

        if (!question) {
            throw new ApiException('Quiz question not found!', 404);
        }

        if (!answer) {
            throw new ApiException('Answer cannot be empty!');
        }
        //todo: more validation
        
        const answerEntity = await Answer.findOne({
            where: {
                user_id: userId,
                question_id: questionId
            }
        });

        if (answerEntity) {
            await answerEntity.update({
                answer
            });
        } else {
            await Answer.create({
                answer,
                user_id: userId,
                question_id: question.id
            });
        }
    }

    async getQuizUserAnswers(userId: number, quizId: number) {
        return await QuizQuestion.findAll({
            attributes: [
                'id',
                'type',
                'choices'
            ],
            where: {
                quiz_id: quizId
            },
            include: {
                association: QuizQuestion.Answers,
                where: {
                    user_id: userId
                },
                required: false
            }
        });
    }

    async getQuizAnswerStatsById(quizId: number): Promise<any> {
        const answers = await QuizQuestion.findAll({
            attributes: [
                'id',
                'question',
                'type',
                'choices'
            ],
            where: {
                quiz_id: quizId
            },
            include: {
                association: QuizQuestion.Answers,
                required: false
            },
            raw: true
        });

        const data: any = {};
        answers.forEach((question: any) => {
            if (data[question.id]) {
                const entry = data[question.id];

                const currentCount = entry.answers[question['answers.answer']] || 0;
                entry.answers[question['answers.answer']] = currentCount + 1;
            } else {

                const entry = {
                    questionId: question.id,
                    questionText: question.question,
                    questionType: question.type,
                    questionChoices: question.choices,
                    answers: {
                        [question['answers.answer']]: 1
                    }
                }
                data[question.id] = entry;
            }
        });

        return data;
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