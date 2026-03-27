import { Injectable } from '@nestjs/common';

@Injectable()
export class ExercisesService {
  getExercise(id: string) { return { id, title: 'Chapter Quiz', questions: [{ id: 'q1', stem: '你好 means?' }] }; }
  submit(exerciseId: string) { return { submissionId: `sub-${exerciseId}-1`, status: 'submitted' }; }
  result(id: string) { return { submissionId: id, score: 88, feedback: 'Good effort, focus on tones.' }; }
}
