declare class AnswerDTO {
    questionId: string;
    selectedOptionIndex: number;
}
export declare class SurveyResponseDTO {
    userId: string;
    answers: AnswerDTO[];
}
export {};
