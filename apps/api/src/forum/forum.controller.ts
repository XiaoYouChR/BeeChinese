import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ForumService } from './forum.service';

@Controller('posts')
export class ForumController {
  constructor(private readonly service: ForumService) {}
  @Get() list() { return ok(this.service.posts()); }
  @Get(':id') detail(@Param('id') id: string) { return ok(this.service.post(id)); }

  @UseGuards(JwtAuthGuard)
  @Post() create(@Body('title') title: string, @Body('content') content: string) { return ok(this.service.createPost(title, content)); }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments') comment(@Param('id') id: string, @Body('content') content: string) { return ok(this.service.comment(id, content)); }
}
