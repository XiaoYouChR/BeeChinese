import { IsOptional, IsString } from 'class-validator';

export class PracticeDto {
  @IsString()
  sentenceId!: string;

  @IsOptional()
  @IsString()
  mockAudioId?: string;
}
