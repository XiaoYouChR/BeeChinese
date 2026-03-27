import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { CoursesService } from './courses.service';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('courses') getCourses() { return ok(this.coursesService.listCourses()); }
  @Get('courses/:id') getCourse(@Param('id') id: string) { return ok(this.coursesService.getCourse(id)); }
  @Get('lessons/:id') getLesson(@Param('id') id: string) { return ok(this.coursesService.getLesson(id)); }

  @UseGuards(JwtAuthGuard)
  @Post('lessons/:id/progress')
  updateProgress(@Param('id') id: string, @Body() dto: UpdateProgressDto) {
    return ok(this.coursesService.updateProgress(id, dto.progressPercent));
  }

  @Get('courses/:id/comments') getComments(@Param('id') id: string) { return ok(this.coursesService.listComments(id)); }

  @UseGuards(JwtAuthGuard)
  @Post('lessons/:id/comments')
  createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    return ok(this.coursesService.createLessonComment(id, dto.content));
  }
}
