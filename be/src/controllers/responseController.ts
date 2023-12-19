import { Request, Response } from 'express';
import * as responseService from '../services/responseService';

export const getUserResponsesBySurvey = async (req: Request, res: Response) => {
  const { userId, surveyId } = req.params;

  try {
    const response = await responseService.getUserResponsesBySurvey(
      userId,
      surveyId
    );

    if (!response) {
      return res.status(404).send({ message: 'Responses not found' });
    }

    res.json(response);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user responses', error });
  }
};

export const submitResponse = async (req: Request, res: Response) => {
  const { surveyId } = req.params;
  const { userId, answers } = req.body;

  try {
    const response = await responseService.submitResponse(
      surveyId,
      userId,
      answers
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: 'Error submitting response', error });
  }
};

export const getUserResponsesByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const responses = await responseService.getUserResponsesByUserId(userId);
    if (!responses || responses.length === 0) {
      return res.status(404).send({ message: 'Responses not found' });
    }

    res.status(201).json(responses);
  } catch (error) {
    res.status(500).send({ message: 'Error submitting response', error });
  }
};
