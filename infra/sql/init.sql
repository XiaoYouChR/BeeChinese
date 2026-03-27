-- BeeChinese MVP init SQL (placeholder for seed/migration bootstrap)
-- TODO: replace with Prisma migrations once schema stabilizes.
CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  metadata JSONB,
  ext JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO roles (id, code, name)
VALUES
  ('role-student', 'student', 'Student'),
  ('role-teacher', 'teacher', 'Teacher'),
  ('role-admin', 'admin', 'Admin')
ON CONFLICT (code) DO NOTHING;
