export interface Answer {
    questionId: string;
    selectedOptionIndex: number;
}
export interface Response {
    _id?: string;
    surveyId: string;
    userId: string;
    answers: Answer[];
}
