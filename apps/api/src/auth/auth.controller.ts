import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ok } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SendCodeDto } from './dto/send-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  sendCode(@Body() dto: SendCodeDto) {
    return ok(this.authService.sendCode(dto.email), 'verification code generated in dev mode');
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return ok(this.authService.login(dto), 'login success');
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return ok(req.user);
  }
}
