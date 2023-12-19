export interface Question {
    _id?: string;
    text: string;
    options: string[];
  }
  
  export interface Survey {
    _id?: string;
    title: string;
    questions: Question[];
  }
  