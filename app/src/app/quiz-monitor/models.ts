export interface AnswerStatEntry {
    questionId: number,
    questionText: string,
    questionType: 'text' | 'numeric' | 'choice',
    questionChoices: string[],
    answers: Record<string, number>
}