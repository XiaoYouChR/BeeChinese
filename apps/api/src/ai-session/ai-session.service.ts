import { Injectable } from '@nestjs/common';

@Injectable()
export class AiSessionService {
  scenarios() { return [{ id: 'hotel', title: 'Hotel Check-in' }, { id: 'restaurant', title: 'Restaurant Ordering' }]; }
  start(scenarioId: string) { return { sessionId: `sess-${scenarioId}-1`, scenarioId, status: 'active' }; }
  message(sessionId: string, message: string) { return { sessionId, reply: `Tutor: Nice try! You said: ${message}` }; }
  finish(sessionId: string) { return { sessionId, status: 'finished' }; }
  report(sessionId: string) { return { sessionId, score: 86, strengths: ['Vocabulary'], improvements: ['Sentence naturalness'] }; }
}
