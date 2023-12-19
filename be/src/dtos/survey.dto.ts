import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';

class QuestionDTO {
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsArray()
  @ArrayNotEmpty()
  public options: string[];
}

export class SurveyDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  public questions: QuestionDTO[];
}
