"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../app"));
const surveyModel_1 = require("../models/surveyModel");
describe('Surveys Controller', () => {
    describe('POST /surveys', () => {
        it('should create a new survey', async () => {
            const mockSurvey = {
                title: 'Test Survey',
                questions: [
                    { text: 'Test Question', options: ['Option 1', 'Option 2'] },
                ],
            };
            jest
                .spyOn(surveyModel_1.SurveyModel.prototype, 'save')
                .mockResolvedValueOnce(mockSurvey);
            const response = await (0, supertest_1.default)(app_1.default).post('/api/surveys').send(mockSurvey);
            expect(response.status).toBe(201);
            expect(response.body.title).toEqual(mockSurvey.title);
            expect(response.body.questions.length).toEqual(mockSurvey.questions.length);
            expect(response.body.questions[0].text).toEqual(mockSurvey.questions[0].text);
            expect(response.body.questions[0].options.join()).toEqual(mockSurvey.questions[0].options.join());
        });
    });
    describe('GET /surveys', () => {
        it('should retrieve all surveys', async () => {
            const mockSurveys = [{ title: 'Survey 1' }, { title: 'Survey 2' }];
            jest.spyOn(surveyModel_1.SurveyModel, 'find').mockResolvedValue(mockSurveys);
            const response = await (0, supertest_1.default)(app_1.default).get('/api/surveys');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSurveys);
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
//# sourceMappingURL=surveyController.test.js.map