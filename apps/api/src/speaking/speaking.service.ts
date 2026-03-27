import { Injectable } from '@nestjs/common';

@Injectable()
export class SpeakingService {
  sentences() { return [{ id: 's1', text: '请问，洗手间在哪里？', pinyin: 'Qǐngwèn, xǐshǒujiān zài nǎlǐ?' }]; }
  practice(sentenceId: string) { return { sentenceId, overallScore: 84, suggestion: 'Tone 3 to 4 transition needs work.' }; }
  favorite(sentenceId: string) { return { sentenceId, favorited: true }; }
  favorites() { return [{ id: 's1', text: '请问，洗手间在哪里？' }]; }
}
