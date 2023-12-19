"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurveyResults = exports.getSurvey = exports.getSurveys = exports.createSurvey = void 0;
const tslib_1 = require("tslib");
const surveyService = tslib_1.__importStar(require("../services/surveyService"));
const createSurvey = async (req, res) => {
    try {
        const survey = await surveyService.createSurvey(req.body);
        res.status(201).send(survey);
    }
    catch (error) {
        res.status(500).send({ message: 'Error adding survey', error });
    }
};
exports.createSurvey = createSurvey;
const getSurveys = async (req, res) => {
    try {
        const surveys = await surveyService.getSurveys();
        res.json(surveys);
    }
    catch (error) {
        res.status(500).send({ message: 'Error retrieving surveys', error });
    }
};
exports.getSurveys = getSurveys;
const getSurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const survey = await surveyService.getSurvey(surveyId);
        res.json(survey);
    }
    catch (error) {
        res.status(500).send({ message: 'Error retrieving surveys', error });
    }
};
exports.getSurvey = getSurvey;
const getSurveyResults = async (req, res) => {
    const { surveyId } = req.params;
    try {
        const results = await surveyService.getSurveyResults(surveyId);
        res.json(results);
    }
    catch (error) {
        res.status(500).send({ message: 'Error fetching survey results', error });
    }
};
exports.getSurveyResults = getSurveyResults;
//# sourceMappingURL=surveyController.js.map