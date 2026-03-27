import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { TeacherService } from './teacher.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('teacher', 'admin')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly service: TeacherService) {}
  @Post('courses') createCourse(@Body() body: any) { return ok(this.service.createCourse(body)); }
  @Put('courses/:id') updateCourse(@Param('id') id: string, @Body() body: any) { return ok(this.service.updateCourse(id, body)); }
  @Post('chapters') createChapter(@Body() body: any) { return ok(this.service.createChapter(body)); }
  @Post('lessons') createLesson(@Body() body: any) { return ok(this.service.createLesson(body)); }
  @Post('lessons/:id/video') uploadVideo(@Param('id') id: string, @Body('videoUrl') videoUrl: string) { return ok(this.service.uploadVideo(id, videoUrl)); }
  @Post('exercises') createExercise(@Body() body: any) { return ok(this.service.createExercise(body)); }
  @Get('submissions') submissions() { return ok(this.service.submissions()); }
}
