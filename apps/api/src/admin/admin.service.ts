import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  users() { return [{ id: 'u1', email: 'student@example.com', status: 'active' }]; }
  courses() { return [{ id: 'c1', title: 'HSK1 Starter' }]; }
  posts() { return [{ id: 'p1', title: 'How to use 把 sentence?' }]; }
  orders() { return [{ id: 'o1', amount: 99, status: 'pending' }]; }
}
