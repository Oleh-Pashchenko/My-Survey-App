import express from 'express';
import {
  createSurvey,
  getSurvey,
  getSurveyResults,
  getSurveys
} from '../controllers/surveyController';
import { SurveyDTO } from './../dtos/survey.dto';
import { ValidationMiddleware } from './../middleware/validation.middleware';

const router = express.Router();

router.post('/api/surveys', ValidationMiddleware(SurveyDTO), createSurvey);

router.get('/api/surveys/:surveyId/results', getSurveyResults);
router.get('/api/surveys/:surveyId', getSurvey);
router.get('/api/surveys', getSurveys);

export default router;