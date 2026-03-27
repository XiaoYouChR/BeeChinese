# BeeChinese 智言未来（MVP Monorepo）

本仓库是面向创业比赛的 **可运行 MVP 工程骨架**，采用 monorepo，优先保证可演示、可扩展和后续迭代效率。

## 第一步：总体实施计划

### 1) 先生成的目录与关键文件
- monorepo 根配置：`package.json`、`pnpm-workspace.yaml`、`tsconfig.base.json`、`.prettierrc`
- 后端主服务（NestJS）：`apps/api`（含认证、课程、练习、口语、AI 会话、论坛、教师、管理模块）
- AI 服务（FastAPI）：`apps/ai-service`（provider 抽象 + mock provider）
- 基础设施：`infra/docker/docker-compose.yml`、`infra/sql/init.sql`
- 公共包：`packages/types`、`packages/api-client`、`packages/shared`、`packages/config`
- 前端目录占位：`apps/learner`、`apps/admin-web`（下一阶段补齐可运行 UI）

### 2) 当前优先模块
1. NestJS 可启动骨架 + 统一响应/异常 + JWT + RBAC Guard
2. Prisma schema（覆盖 MVP 指定核心业务表）
3. FastAPI 可启动骨架 + AI 接口 mock 返回
4. Docker 启动 PostgreSQL / Redis / MinIO

### 3) 当前使用 mock 的模块
- 邮箱验证码：开发环境固定验证码（默认 `123456`）
- 练习批改、发音评分、助教对话、专家回帖：FastAPI provider adapter + mock provider
- 课程/论坛/后台列表：NestJS service 层使用 mock 数据，后续替换 Prisma 查询

## 第二步：完整目录树

```text
beechinese/
  apps/
    learner/
    admin-web/
    api/
      prisma/
      src/
        common/
        auth/
        courses/
        exercises/
        speaking/
        ai-session/
        forum/
        teacher/
        admin/
        database/
    ai-service/
      app/
        api/
        core/providers/
        schemas/
        services/
  packages/
    types/
    api-client/
    shared/
    config/
  infra/
    docker/
    sql/
    docs/
```

## 第三步：后端基础骨架设计（已落地）

### NestJS（apps/api）
- 鉴权：JWT（`Authorization: Bearer <token>`）
- RBAC：`Roles` 装饰器 + `RolesGuard`（`student / teacher / admin`）
- 统一响应：`ok(...)` 返回 `{ success, message, data }`
- 统一异常：全局 `HttpExceptionFilter`
- 参数校验：全局 `ValidationPipe`

#### 已实现接口
- auth
  - `POST /api/auth/send-code`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- courses
  - `GET /api/courses`
  - `GET /api/courses/:id`
  - `GET /api/lessons/:id`
  - `POST /api/lessons/:id/progress`（需登录）
  - `GET /api/courses/:id/comments`
  - `POST /api/lessons/:id/comments`（需登录）
- exercises
  - `GET /api/exercises/:id`
  - `POST /api/exercises/:id/submit`（需登录）
  - `GET /api/submissions/:id/result`（需登录）
- speaking（均需登录）
  - `GET /api/speaking/sentences`
  - `POST /api/speaking/practice`
  - `POST /api/speaking/favorites/:sentenceId`
  - `GET /api/speaking/favorites`
- ai-session（均需登录）
  - `GET /api/ai-scenarios`
  - `POST /api/ai-session/start`
  - `POST /api/ai-session/message`
  - `POST /api/ai-session/finish`
  - `GET /api/ai-session/:id/report`
- forum
  - `GET /api/posts`
  - `POST /api/posts`（需登录）
  - `GET /api/posts/:id`
  - `POST /api/posts/:id/comments`（需登录）
- teacher（需 teacher/admin）
  - `POST /api/teacher/courses`
  - `PUT /api/teacher/courses/:id`
  - `POST /api/teacher/chapters`
  - `POST /api/teacher/lessons`
  - `POST /api/teacher/lessons/:id/video`
  - `POST /api/teacher/exercises`
  - `GET /api/teacher/submissions`
- admin（需 admin）
  - `GET /api/admin/users`
  - `GET /api/admin/courses`
  - `GET /api/admin/posts`
  - `GET /api/admin/orders`

### Prisma（apps/api/prisma/schema.prisma）
- 采用 Prisma（更适合 MVP 快速迭代、类型安全、迁移清晰）
- 覆盖你要求的核心表：
  - 用户权限：`users/user_profiles/roles/user_roles/email_verification_codes`
  - 课程：`teachers/courses/course_chapters/course_lessons/enrollments/lesson_progress/lesson_comments`
  - 练习：`exercises/exercise_questions/exercise_submissions/exercise_submission_answers/ai_feedback_records`
  - 口语：`speaking_sentences/speaking_practice_records/speaking_error_items/user_favorite_sentences`
  - AI 助教：`ai_scenarios/ai_sessions/ai_session_messages/ai_session_reports`
  - 社区：`forum_posts/forum_comments/expert_ai_replies`
  - 支付：`orders/payments`
- 设计约束：全部包含 `id/created_at/updated_at`、`status/metadata/ext` 扩展字段。

### FastAPI（apps/ai-service）
- Provider 抽象：`base.py`
- Mock Provider：`mock_provider.py`
- 可替换入口：`provider_factory.py`（后续接真实 LLM）
- 已实现接口：
  - `POST /ai/grading/exercise`
  - `POST /ai/pronunciation/evaluate`
  - `POST /ai/tutor/reply`
  - `POST /ai/tutor/report`
  - `POST /ai/expert/forum-reply`

### Docker 本地开发
- `infra/docker/docker-compose.yml` 启动：PostgreSQL、Redis、MinIO。

## 快速启动

```bash
# 1) 启动基础设施
cd infra/docker && docker compose up -d

# 2) 启动 NestJS API
cd /workspace/BeeChinese
pnpm install
pnpm dev:api

# 3) 启动 FastAPI
cd /workspace/BeeChinese
python -m venv .venv && source .venv/bin/activate
pip install -r apps/ai-service/requirements.txt
uvicorn main:app --reload --app-dir apps/ai-service
```

## 下一阶段
- 补齐 `apps/learner`（Taro）可运行页面骨架
- 补齐 `apps/admin-web`（Next.js）可运行后台骨架
- 将 NestJS mock service 替换为 Prisma repository 实现
