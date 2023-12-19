"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitResponse = exports.getUserResponsesByUserId = exports.getUserResponsesBySurvey = void 0;
const responseModel_1 = require("../models/responseModel");
const getUserResponsesBySurvey = async (userId, surveyId) => {
    return await responseModel_1.SurveyResponseModel.findOne({ user: userId, survey: surveyId });
};
exports.getUserResponsesBySurvey = getUserResponsesBySurvey;
const submitResponse = async (surveyId, userId, answers) => {
    const response = new responseModel_1.SurveyResponseModel({
        survey: surveyId,
        user: userId,
        answers,
    });
    await response.save();
    return response;
};
exports.submitResponse = submitResponse;
const getUserResponsesByUserId = async (userId) => {
    const responses = await responseModel_1.SurveyResponseModel.find({ user: userId }).populate('survey');
    return responses;
};
exports.getUserResponsesByUserId = getUserResponsesByUserId;
//# sourceMappingURL=responseService.js.map