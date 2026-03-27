import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SubmitExerciseDto } from './dto/submit-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller()
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('exercises/:id') getExercise(@Param('id') id: string) { return ok(this.exercisesService.getExercise(id)); }

  @UseGuards(JwtAuthGuard)
  @Post('exercises/:id/submit')
  submit(@Param('id') id: string, @Body() _dto: SubmitExerciseDto) { return ok(this.exercisesService.submit(id)); }

  @UseGuards(JwtAuthGuard)
  @Get('submissions/:id/result')
  getResult(@Param('id') id: string) { return ok(this.exercisesService.result(id)); }
}
