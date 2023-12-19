import { Document, Schema, model } from 'mongoose';
import { SurveyResponse } from '../interfaces/surveyResponse.interface';

const surveyResponseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
  answers: [
    {
      questionId: String,
      selectedOptionIndex: Number,
    },
  ],
});

export const SurveyResponseModel = model<SurveyResponse & Document>(
  'SurveyResponse',
  surveyResponseSchema
);
