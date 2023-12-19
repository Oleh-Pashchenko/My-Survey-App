import { SurveyDTO } from '../dtos/survey.dto';
import { SurveyResponseModel } from '../models/responseModel';
import { SurveyModel } from '../models/surveyModel';

const createSurvey = async (surveyData: SurveyDTO) => {
  const survey = new SurveyModel(surveyData);
  await survey.save();
  return survey;
};

const getSurveys = async () => {
  return await SurveyModel.find();
};

const getSurvey = async (surveyId: string) => {
  return await SurveyModel.findById(surveyId);
};

const getSurveyResults = async (surveyId: string) => {
  try {
    const responses = await SurveyResponseModel.find({ survey: surveyId });

    let questionOptionCounts = {};

    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        const questionId = answer.questionId;
        const selectedOptionIndex = answer.selectedOptionIndex;

        if (!questionOptionCounts[questionId]) {
          questionOptionCounts[questionId] = {};
        }

        questionOptionCounts[questionId][selectedOptionIndex] =
          (questionOptionCounts[questionId][selectedOptionIndex] || 0) + 1;
      });
    });

    return questionOptionCounts;
  } catch (error) {
    throw new Error('Error calculating option counts: ' + error.message);
  }
};

export { createSurvey, getSurvey, getSurveyResults, getSurveys };
