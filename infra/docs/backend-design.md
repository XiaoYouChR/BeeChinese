# Backend MVP Design Notes

## Why Prisma
- Strong TypeScript type safety and quick schema iteration.
- Fits NestJS MVP pace better than heavy repository boilerplate.

## Index suggestions
- users(email)
- user_roles(user_id, role_id)
- email_verification_codes(email, code)
- courses(teacher_id, status)
- course_chapters(course_id, sort_order)
- course_lessons(chapter_id, sort_order)
- enrollments(user_id, course_id)
- lesson_progress(user_id, lesson_id)
- exercise_submissions(exercise_id, user_id)
- speaking_practice_records(user_id, sentence_id)
- ai_sessions(user_id, scenario_id)
- forum_posts(status, created_at)
- orders(user_id, status)
- payments(order_id, status)
