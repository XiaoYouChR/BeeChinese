import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AiSessionService } from './ai-session.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class AiSessionController {
  constructor(private readonly service: AiSessionService) {}

  @Get('ai-scenarios') scenarios() { return ok(this.service.scenarios()); }
  @Post('ai-session/start') start(@Body('scenarioId') scenarioId: string) { return ok(this.service.start(scenarioId)); }
  @Post('ai-session/message') message(@Body('sessionId') sessionId: string, @Body('message') message: string) { return ok(this.service.message(sessionId, message)); }
  @Post('ai-session/finish') finish(@Body('sessionId') sessionId: string) { return ok(this.service.finish(sessionId)); }
  @Get('ai-session/:id/report') report(@Param('id') id: string) { return ok(this.service.report(id)); }
}
