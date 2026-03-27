import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sendCode(email: string) {
    return { email, code: process.env.EMAIL_CODE_FIXED || '123456' };
  }

  login(dto: LoginDto) {
    const validCode = process.env.EMAIL_CODE_FIXED || '123456';
    if (dto.code !== validCode) throw new UnauthorizedException('Invalid verification code');

    const payload = { sub: 'mock-user-1', email: dto.email, role: 'student' };
    return { accessToken: this.jwtService.sign(payload), user: payload };
  }
}
