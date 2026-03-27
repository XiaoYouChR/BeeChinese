import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Get('users') users() { return ok(this.service.users()); }
  @Get('courses') courses() { return ok(this.service.courses()); }
  @Get('posts') posts() { return ok(this.service.posts()); }
  @Get('orders') orders() { return ok(this.service.orders()); }
}
