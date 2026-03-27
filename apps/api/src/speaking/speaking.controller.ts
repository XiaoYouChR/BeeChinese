import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PracticeDto } from './dto/practice.dto';
import { SpeakingService } from './speaking.service';

@UseGuards(JwtAuthGuard)
@Controller('speaking')
export class SpeakingController {
  constructor(private readonly speakingService: SpeakingService) {}

  @Get('sentences') listSentences() { return ok(this.speakingService.sentences()); }
  @Post('practice') practice(@Body() dto: PracticeDto) { return ok(this.speakingService.practice(dto.sentenceId)); }
  @Post('favorites/:sentenceId') favorite(@Param('sentenceId') sentenceId: string) { return ok(this.speakingService.favorite(sentenceId)); }
  @Get('favorites') favorites() { return ok(this.speakingService.favorites()); }
}
