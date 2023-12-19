import { Document, Schema, model } from 'mongoose';
import { Survey } from '../interfaces/survey.interface';

const surveySchema = new Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: String,
      options: [String],
    },
  ],
});

export const SurveyModel = model<Survey & Document>('Survey', surveySchema);
