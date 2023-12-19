/// <reference types="mongoose" />
declare const getUserResponsesBySurvey: (userId: string, surveyId: string) => Promise<import("../interfaces/surveyResponse.interface").SurveyResponse & import("mongoose").Document<any, any, any>>;
declare const submitResponse: (surveyId: string, userId: string, answers: any[]) => Promise<import("../interfaces/surveyResponse.interface").SurveyResponse & import("mongoose").Document<any, any, any>>;
declare const getUserResponsesByUserId: (userId: string) => Promise<(import("../interfaces/surveyResponse.interface").SurveyResponse & import("mongoose").Document<any, any, any>)[]>;
export { getUserResponsesBySurvey, getUserResponsesByUserId, submitResponse };
