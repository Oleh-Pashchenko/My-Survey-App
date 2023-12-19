/// <reference types="mongoose" />
import { SurveyDTO } from '../dtos/survey.dto';
declare const createSurvey: (surveyData: SurveyDTO) => Promise<import("../interfaces/survey.interface").Survey & import("mongoose").Document<any, any, any>>;
declare const getSurveys: () => Promise<(import("../interfaces/survey.interface").Survey & import("mongoose").Document<any, any, any>)[]>;
declare const getSurvey: (surveyId: string) => Promise<import("../interfaces/survey.interface").Survey & import("mongoose").Document<any, any, any>>;
declare const getSurveyResults: (surveyId: string) => Promise<{}>;
export { createSurvey, getSurvey, getSurveyResults, getSurveys };
