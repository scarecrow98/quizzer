import { User } from "./user.model";

export interface Quiz {
    id: number;
    title: string;
    tag: string,
    created_at: string;
    created_by: number;
    questions: QuizQuestion[],

    user?: User;
}

export interface QuizQuestion {
    id: number;
    question: string;
    type: 'text' | 'numeric' | 'choice';
    choices: string[];

    quiz_id: number;
}