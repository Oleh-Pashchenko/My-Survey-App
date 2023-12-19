import express from 'express';
import {
  getUserResponsesBySurvey,
  getUserResponsesByUserId,
  submitResponse,
} from '../controllers/responseController';
import { SurveyResponseDTO } from '../dtos/surveyResponse.dto';
import { ValidationMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.post(
  '/api/responses/:surveyId',
  ValidationMiddleware(SurveyResponseDTO),
  submitResponse
);

router.get('/api/responses/:surveyId/user/:userId', getUserResponsesBySurvey);

router.get('/api/responses/user/:userId', getUserResponsesByUserId);

export default router;
