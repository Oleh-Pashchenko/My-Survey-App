import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { SurveyDTO } from '../dtos/survey.dto';
import { SurveyResponseDTO } from '../dtos/surveyResponse.dto';
import { CreateUserDTO } from '../dtos/user.dto';
import { Survey } from '../interfaces/survey.interface';
import { SurveyResponse } from '../interfaces/surveyResponse.interface';
import { User } from '../interfaces/users.interface';
import { SurveyResponseModel } from '../models/responseModel';
import { SurveyModel } from '../models/surveyModel';

describe('Response Controller', () => {
  describe('POST /api/responses/:surveyId', () => {
    let survey: Survey;
    let user: User;

    beforeAll(async () => {
      const newSurvey: SurveyDTO = {
        title: 'Test Survey',
        questions: [
          { text: 'Test Question', options: ['Option 1', 'Option 2'] },
        ],
      };

      const newUser: CreateUserDTO = {
        name: 'Oleh',
      };

      const surveyResponse = await request(app)
        .post('/api/surveys')
        .send(newSurvey);

      const newUserResponse = await request(app)
        .post('/api/users')
        .send(newUser);

      user = newUserResponse.body;
      survey = surveyResponse.body;
    });

    it('should respond to a survey', async () => {
      const surveyResponse: SurveyResponseDTO = {
        userId: user._id,
        answers: [
          { questionId: survey.questions[0]._id, selectedOptionIndex: 0 },
        ],
      };

      const response = await request(app)
        .post(`/api/responses/${survey._id}`)
        .send(surveyResponse);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user', surveyResponse.userId);
    });
  });

  describe('GET /api/responses/:surveyId/user/:userId', () => {
    let survey: Survey;
    let surveyResponse: SurveyResponse;
    let user: User;

    beforeAll(async () => {
      const mockSurvey = {
        title: 'Test Survey',
        questions: [
          { text: 'Test Question', options: ['Option 1', 'Option 2'] },
        ],
      };

      survey = await new SurveyModel(mockSurvey).save();
      const newUser: CreateUserDTO = {
        name: 'Oleh',
      };

      const newUserResponse = await request(app)
        .post('/api/users')
        .send(newUser);

      user = newUserResponse.body;

      const mockResponse: SurveyResponse = {
        survey: survey._id,
        user: user._id,
        answers: [
          { questionId: survey.questions[0]._id, selectedOptionIndex: 0 },
        ],
      };

      surveyResponse = await new SurveyResponseModel(mockResponse).save();
    });

    it('should retrieve user responses for a survey', async () => {
      const response = await request(app).get(
        `/api/responses/${survey._id}/user/${user._id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('answers');
      expect(response.body.answers[0]).toHaveProperty('selectedOptionIndex', 0);
    });

    it('should return a 404 for non-existing survey', async () => {
      const nonExistingSurveyId = '5f50c31f9f1b2e3c3d123456';
      const userId = '5f50c31f9f1b2e3c3d123455';

      const response = await request(app).get(
        `/api/responses/${nonExistingSurveyId}/user/${userId}`
      );
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Responses not found' });
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
