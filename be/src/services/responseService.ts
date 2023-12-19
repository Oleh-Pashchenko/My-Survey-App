import { SurveyResponseModel } from '../models/responseModel';

const getUserResponsesBySurvey = async (userId: string, surveyId: string) => {
  return await SurveyResponseModel.findOne({ user: userId, survey: surveyId });
};

const submitResponse = async (
  surveyId: string,
  userId: string,
  answers: any[]
) => {
  const response = new SurveyResponseModel({
    survey: surveyId,
    user: userId,
    answers,
  });
  await response.save();
  return response;
};

const getUserResponsesByUserId = async (userId: string) => {
  const responses = await SurveyResponseModel.find({ user: userId }).populate(
    'survey'
  );

  return responses;
};

export { getUserResponsesBySurvey, getUserResponsesByUserId, submitResponse };
