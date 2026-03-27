import { IsArray, IsString } from 'class-validator';

export class SubmitExerciseDto {
  @IsArray()
  answers!: Array<{ questionId: string; answer: string }>;

  @IsString()
  attemptNote!: string;
}
