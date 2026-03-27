import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SpeakingModule } from './speaking/speaking.module';
import { AiSessionModule } from './ai-session/ai-session.module';
import { ForumModule } from './forum/forum.module';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev_secret_change_me',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    CoursesModule,
    ExercisesModule,
    SpeakingModule,
    AiSessionModule,
    ForumModule,
    TeacherModule,
    AdminModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
