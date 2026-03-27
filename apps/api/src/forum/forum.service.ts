import { Injectable } from '@nestjs/common';

@Injectable()
export class ForumService {
  posts() { return [{ id: 'p1', title: 'How to use 把 sentence?', tags: ['地道表达'] }]; }
  createPost(title: string, content: string) { return { id: 'p-new', title, content }; }
  post(id: string) { return { id, title: 'How to use 把 sentence?', content: 'Any tips?', comments: [] }; }
  comment(postId: string, content: string) { return { id: 'c-new', postId, content }; }
}
