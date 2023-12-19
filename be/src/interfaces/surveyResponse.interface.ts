export interface Answer {
  questionId: string;
  selectedOptionIndex: number;
}

export interface SurveyResponse {
  _id?: string;
  survey?: string;
  user: string;
  answers: Answer[];
}
