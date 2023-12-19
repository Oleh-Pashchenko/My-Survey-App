import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class AnswerDTO {
  @IsMongoId()
  public questionId: string;

  @IsNumber()
  @IsNotEmpty()
  public selectedOptionIndex: number;
}

export class SurveyResponseDTO {
  @IsMongoId()
  public userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  public answers: AnswerDTO[];
}
