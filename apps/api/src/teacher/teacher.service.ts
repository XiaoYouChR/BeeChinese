import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
  createCourse(payload: any) { return { id: 'tc1', ...payload }; }
  updateCourse(id: string, payload: any) { return { id, ...payload }; }
  createChapter(payload: any) { return { id: 'ch1', ...payload }; }
  createLesson(payload: any) { return { id: 'l1', ...payload }; }
  uploadVideo(id: string, videoUrl: string) { return { lessonId: id, videoUrl }; }
  createExercise(payload: any) { return { id: 'ex1', ...payload }; }
  submissions() { return [{ id: 'sub1', userId: 'u1', exerciseId: 'ex1', score: 80 }]; }
}
