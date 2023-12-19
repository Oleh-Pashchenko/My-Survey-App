"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const responseModel_1 = require("../models/responseModel");
const surveyModel_1 = require("../models/surveyModel");
describe('Response Controller', () => {
    describe('POST /api/responses/:surveyId', () => {
        let survey;
        let user;
        beforeAll(async () => {
            const newSurvey = {
                title: 'Test Survey',
                questions: [
                    { text: 'Test Question', options: ['Option 1', 'Option 2'] },
                ],
            };
            const newUser = {
                name: 'Oleh',
            };
            const surveyResponse = await (0, supertest_1.default)(app_1.default)
                .post('/api/surveys')
                .send(newSurvey);
            const newUserResponse = await (0, supertest_1.default)(app_1.default)
                .post('/api/users')
                .send(newUser);
            user = newUserResponse.body;
            survey = surveyResponse.body;
        });
        it('should respond to a survey', async () => {
            const surveyResponse = {
                userId: user._id,
                answers: [
                    { questionId: survey.questions[0]._id, selectedOptionIndex: 0 },
                ],
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post(`/api/responses/${survey._id}`)
                .send(surveyResponse);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('user', surveyResponse.userId);
        });
    });
    describe('GET /api/responses/:surveyId/user/:userId', () => {
        let survey;
        let surveyResponse;
        let user;
        beforeAll(async () => {
            const mockSurvey = {
                title: 'Test Survey',
                questions: [
                    { text: 'Test Question', options: ['Option 1', 'Option 2'] },
                ],
            };
            survey = await new surveyModel_1.SurveyModel(mockSurvey).save();
            const newUser = {
                name: 'Oleh',
            };
            const newUserResponse = await (0, supertest_1.default)(app_1.default)
                .post('/api/users')
                .send(newUser);
            user = newUserResponse.body;
            const mockResponse = {
                survey: survey._id,
                user: user._id,
                answers: [
                    { questionId: survey.questions[0]._id, selectedOptionIndex: 0 },
                ],
            };
            surveyResponse = await new responseModel_1.SurveyResponseModel(mockResponse).save();
        });
        it('should retrieve user responses for a survey', async () => {
            const response = await (0, supertest_1.default)(app_1.default).get(`/api/responses/${survey._id}/user/${user._id}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('answers');
            expect(response.body.answers[0]).toHaveProperty('selectedOptionIndex', 0);
        });
        it('should return a 404 for non-existing survey', async () => {
            const nonExistingSurveyId = '5f50c31f9f1b2e3c3d123456';
            const userId = '5f50c31f9f1b2e3c3d123455';
            const response = await (0, supertest_1.default)(app_1.default).get(`/api/responses/${nonExistingSurveyId}/user/${userId}`);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Responses not found' });
        });
    });
    afterAll(async (done) => {
        for (const modelKey in mongoose_1.default.connection.models) {
            const model = mongoose_1.default.connection.models[modelKey];
            await model.deleteMany();
        }
        mongoose_1.default.connection.close(done);
    });
});
//# sourceMappingURL=responseController.test.js.map