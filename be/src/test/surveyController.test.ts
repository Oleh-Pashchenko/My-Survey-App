import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { SurveyDTO } from '../dtos/survey.dto';
import { SurveyModel } from '../models/surveyModel';

describe('Surveys Controller', () => {
  describe('POST /surveys', () => {
    it('should create a new survey', async () => {
      const mockSurvey: SurveyDTO = {
        title: 'Test Survey',
        questions: [
          { text: 'Test Question', options: ['Option 1', 'Option 2'] },
        ],
      };

      jest
        .spyOn(SurveyModel.prototype, 'save')
        .mockResolvedValueOnce(mockSurvey as any);

      const response = await request(app).post('/api/surveys').send(mockSurvey);

      expect(response.status).toBe(201);
      expect(response.body.title).toEqual(mockSurvey.title);
      expect(response.body.questions.length).toEqual(
        mockSurvey.questions.length
      );

      expect(response.body.questions[0].text).toEqual(
        mockSurvey.questions[0].text
      );
      expect(response.body.questions[0].options.join()).toEqual(
        mockSurvey.questions[0].options.join()
      );
    });
  });

  describe('GET /surveys', () => {
    it('should retrieve all surveys', async () => {
      const mockSurveys = [{ title: 'Survey 1' }, { title: 'Survey 2' }];

      jest.spyOn(SurveyModel, 'find').mockResolvedValue(mockSurveys as any);

      const response = await request(app).get('/api/surveys');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSurveys);
    });
  });

  afterAll(async (done) => {
    for (const modelKey in mongoose.connection.models) {
      const model = mongoose.connection.models[modelKey];
      await model.deleteMany();
    }

    mongoose.connection.close(done);
  });
});
