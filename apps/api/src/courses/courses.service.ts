import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
  listCourses() { return [{ id: 'c1', title: 'HSK1 Starter', status: 'published' }]; }
  getCourse(id: string) { return { id, title: 'HSK1 Starter', description: 'MVP course detail' }; }
  getLesson(id: string) { return { id, title: 'Lesson 1', videoUrl: 'https://example.com/demo.mp4' }; }
  updateProgress(lessonId: string, progressPercent: number) { return { lessonId, progressPercent }; }
  listComments(courseId: string) { return [{ id: 'cm1', courseId, content: 'Great lesson!' }]; }
  createLessonComment(lessonId: string, content: string) { return { id: 'cm-new', lessonId, content }; }
}
