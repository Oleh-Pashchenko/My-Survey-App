"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurveys = exports.getSurveyResults = exports.getSurvey = exports.createSurvey = void 0;
const responseModel_1 = require("../models/responseModel");
const surveyModel_1 = require("../models/surveyModel");
const createSurvey = async (surveyData) => {
    const survey = new surveyModel_1.SurveyModel(surveyData);
    await survey.save();
    return survey;
};
exports.createSurvey = createSurvey;
const getSurveys = async () => {
    return await surveyModel_1.SurveyModel.find();
};
exports.getSurveys = getSurveys;
const getSurvey = async (surveyId) => {
    return await surveyModel_1.SurveyModel.findById(surveyId);
};
exports.getSurvey = getSurvey;
const getSurveyResults = async (surveyId) => {
    try {
        const responses = await responseModel_1.SurveyResponseModel.find({ survey: surveyId });
        let questionOptionCounts = {};
        responses.forEach((response) => {
            response.answers.forEach((answer) => {
                const questionId = answer.questionId;
                const selectedOptionIndex = answer.selectedOptionIndex;
                if (!questionOptionCounts[questionId]) {
                    questionOptionCounts[questionId] = {};
                }
                questionOptionCounts[questionId][selectedOptionIndex] =
                    (questionOptionCounts[questionId][selectedOptionIndex] || 0) + 1;
            });
        });
        return questionOptionCounts;
    }
    catch (error) {
        throw new Error('Error calculating option counts: ' + error.message);
    }
};
exports.getSurveyResults = getSurveyResults;
//# sourceMappingURL=surveyService.js.map