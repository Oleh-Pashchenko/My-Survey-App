import { Request, Response } from 'express';
import * as openai from '../services/openai.service';
import * as surveyService from '../services/surveyService';


export const createSurvey = async (req: Request, res: Response) => {
  try {
    const survey = await surveyService.createSurvey(req.body);
    res.status(201).send(survey);
  } catch (error) {
    res.status(500).send({ message: 'Error adding survey', error });
  }
};

export const getSurveys = async (req: Request, res: Response) => {
  try {
    const surveys = await surveyService.getSurveys();
    res.json(surveys);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving surveys', error });
  }
};

export const getSurvey = async (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params;

    const survey = await surveyService.getSurvey(surveyId);
    res.json(survey);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving surveys', error });
  }
};

export const getSurveyResults = async (req: Request, res: Response) => {
  const { surveyId } = req.params;

  try {
    const results = await surveyService.getSurveyResults(surveyId);
    res.json(results);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching survey results', error });
  }
};

export const aiGenerateSurveyQuestions = async (req: Request, res: Response) => {
  const { title } = req.query;

  try {
    const results = await openai.generateSurveyQuestions(title);
    res.json(results);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching survey results', error });
  }
};

