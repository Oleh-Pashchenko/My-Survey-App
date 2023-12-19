"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserResponsesByUserId = exports.submitResponse = exports.getUserResponsesBySurvey = void 0;
const tslib_1 = require("tslib");
const responseService = tslib_1.__importStar(require("../services/responseService"));
const getUserResponsesBySurvey = async (req, res) => {
    const { userId, surveyId } = req.params;
    try {
        const response = await responseService.getUserResponsesBySurvey(userId, surveyId);
        if (!response) {
            return res.status(404).send({ message: 'Responses not found' });
        }
        res.json(response);
    }
    catch (error) {
        res.status(500).send({ message: 'Error fetching user responses', error });
    }
};
exports.getUserResponsesBySurvey = getUserResponsesBySurvey;
const submitResponse = async (req, res) => {
    const { surveyId } = req.params;
    const { userId, answers } = req.body;
    try {
        const response = await responseService.submitResponse(surveyId, userId, answers);
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).send({ message: 'Error submitting response', error });
    }
};
exports.submitResponse = submitResponse;
const getUserResponsesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const responses = await responseService.getUserResponsesByUserId(userId);
        if (!responses || responses.length === 0) {
            return res.status(404).send({ message: 'Responses not found' });
        }
        res.status(201).json(responses);
    }
    catch (error) {
        res.status(500).send({ message: 'Error submitting response', error });
    }
};
exports.getUserResponsesByUserId = getUserResponsesByUserId;
//# sourceMappingURL=responseController.js.map