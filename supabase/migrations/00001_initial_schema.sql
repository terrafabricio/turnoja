-- ============================================================
-- TurnoJa - Initial Database Schema
-- Marketplace for temporary workers in Brazil
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('empresa', 'trabalhador', 'admin');

CREATE TYPE job_status AS ENUM ('rascunho', 'publicada', 'em_andamento', 'concluida', 'cancelada');

CREATE TYPE application_status AS ENUM ('pendente', 'aceita', 'recusada', 'cancelada');

CREATE TYPE assignment_status AS ENUM ('confirmado', 'em_andamento', 'concluido', 'no_show', 'cancelado');

CREATE TYPE payment_status AS ENUM ('pendente', 'processando', 'pago', 'falhou');

CREATE TYPE document_status AS ENUM ('pendente', 'aprovado', 'rejeitado');

CREATE TYPE attendance_type AS ENUM ('check_in', 'check_out');

CREATE TYPE ticket_status AS ENUM ('aberto', 'em_andamento', 'resolvido', 'fechado');

CREATE TYPE report_status AS ENUM ('pendente', 'investigando', 'resolvido', 'descartado');

CREATE TYPE job_category AS ENUM (
  'eventos',
  'restaurante',
  'bar',
  'promotor',
  'reposicao',
  'logistica',
  'atendimento',
  'limpeza',
  'cozinha',
  'carga_descarga',
  'operacional',
  'outros'
);

-- ============================================================
-- HELPER FUNCTION: updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- HELPER FUNCTION: get current user role
-- ============================================================

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- TABLE 1: profiles
-- ============================================================

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  avatar_url  TEXT,
  role        user_role NOT NULL DEFAULT 'trabalhador',
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE 2: company_profiles
-- ============================================================

CREATE TABLE company_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  trade_name    VARCHAR(255) NOT NULL,
  legal_name    VARCHAR(255) NOT NULL,
  cnpj          VARCHAR(18) NOT NULL UNIQUE,
  description   TEXT,
  logo_url      TEXT,
  website       VARCHAR(500),
  address       VARCHAR(500),
  city          VARCHAR(100),
  state         VARCHAR(2),
  cep           VARCHAR(9),
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  is_verified   BOOLEAN NOT NULL DEFAULT FALSE,
  rating_avg    NUMERIC(3,2) NOT NULL DEFAULT 0,
  rating_count  INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 3: worker_profiles
-- ============================================================

CREATE TABLE worker_profiles (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id           UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  cpf                  VARCHAR(14) NOT NULL UNIQUE,
  date_of_birth        DATE,
  bio                  TEXT,
  skills               TEXT[],
  categories           job_category[],
  experience_years     INTEGER NOT NULL DEFAULT 0,
  city                 VARCHAR(100),
  state                VARCHAR(2),
  cep                  VARCHAR(9),
  lat                  DOUBLE PRECISION,
  lng                  DOUBLE PRECISION,
  is_available         BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified          BOOLEAN NOT NULL DEFAULT FALSE,
  rating_avg           NUMERIC(3,2) NOT NULL DEFAULT 0,
  rating_count         INTEGER NOT NULL DEFAULT 0,
  completed_jobs_count INTEGER NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 4: worker_documents
-- ============================================================

CREATE TABLE worker_documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id   UUID NOT NULL REFERENCES worker_profiles(id) ON DELETE CASCADE,
  type        VARCHAR(50) NOT NULL,
  file_url    TEXT NOT NULL,
  status      document_status NOT NULL DEFAULT 'pendente',
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 5: jobs
-- ============================================================

CREATE TABLE jobs (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id           UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  title                VARCHAR(255) NOT NULL,
  description          TEXT NOT NULL,
  category             job_category NOT NULL,
  address              VARCHAR(500),
  city                 VARCHAR(100) NOT NULL,
  state                VARCHAR(2) NOT NULL,
  cep                  VARCHAR(9),
  lat                  DOUBLE PRECISION,
  lng                  DOUBLE PRECISION,
  date                 DATE NOT NULL,
  start_time           TIME NOT NULL,
  end_time             TIME NOT NULL,
  payment_amount_cents INTEGER NOT NULL CHECK (payment_amount_cents > 0),
  slots                INTEGER NOT NULL CHECK (slots > 0),
  filled_slots         INTEGER NOT NULL DEFAULT 0 CHECK (filled_slots >= 0),
  requirements         TEXT[],
  dress_code           VARCHAR(255),
  includes_meal        BOOLEAN NOT NULL DEFAULT FALSE,
  includes_transport   BOOLEAN NOT NULL DEFAULT FALSE,
  status               job_status NOT NULL DEFAULT 'rascunho',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE 6: job_applications
-- ============================================================

CREATE TABLE job_applications (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id       UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id    UUID NOT NULL REFERENCES worker_profiles(id) ON DELETE CASCADE,
  status       application_status NOT NULL DEFAULT 'pendente',
  message      TEXT,
  applied_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  UNIQUE(job_id, worker_id)
);

-- ============================================================
-- TABLE 7: job_assignments
-- ============================================================

CREATE TABLE job_assignments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id       UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id    UUID NOT NULL REFERENCES worker_profiles(id) ON DELETE CASCADE,
  company_id   UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  status       assignment_status NOT NULL DEFAULT 'confirmado',
  assigned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at   TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- ============================================================
-- TABLE 8: attendance_logs
-- ============================================================

CREATE TABLE attendance_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES job_assignments(id) ON DELETE CASCADE,
  type          attendance_type NOT NULL,
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  photo_url     TEXT,
  notes         TEXT
);

-- ============================================================
-- TABLE 9: payments
-- ============================================================

CREATE TABLE payments (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id      UUID NOT NULL UNIQUE REFERENCES job_assignments(id) ON DELETE CASCADE,
  company_id         UUID NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  worker_id          UUID NOT NULL REFERENCES worker_profiles(id) ON DELETE CASCADE,
  amount_cents       INTEGER NOT NULL CHECK (amount_cents > 0),
  platform_fee_cents INTEGER NOT NULL DEFAULT 0 CHECK (platform_fee_cents >= 0),
  net_amount_cents   INTEGER NOT NULL CHECK (net_amount_cents > 0),
  status             payment_status NOT NULL DEFAULT 'pendente',
  paid_at            TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 10: wallet_transactions
-- ============================================================

CREATE TABLE wallet_transactions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id         UUID NOT NULL REFERENCES worker_profiles(id) ON DELETE CASCADE,
  payment_id        UUID REFERENCES payments(id) ON DELETE SET NULL,
  amount_cents      INTEGER NOT NULL,
  type              VARCHAR(20) NOT NULL CHECK (type IN ('credit', 'debit', 'withdrawal')),
  description       TEXT,
  balance_after_cents INTEGER NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 11: reviews
-- ============================================================

CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assignment_id UUID NOT NULL REFERENCES job_assignments(id) ON DELETE CASCADE,
  rating        INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(reviewer_id, assignment_id)
);

-- ============================================================
-- TABLE 12: notifications
-- ============================================================

CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      VARCHAR(255) NOT NULL,
  message    TEXT NOT NULL,
  type       VARCHAR(50) NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  data       JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE 13: support_tickets
-- ============================================================

CREATE TABLE support_tickets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject     VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status      ticket_status NOT NULL DEFAULT 'aberto',
  priority    VARCHAR(20) NOT NULL DEFAULT 'normal',
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLE 14: reports
-- ============================================================

CREATE TABLE reports (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason      VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status      report_status NOT NULL DEFAULT 'pendente',
  resolution  TEXT,
  handled_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ============================================================
-- TABLE 15: admin_actions
-- ============================================================

CREATE TABLE admin_actions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  target_type VARCHAR(100) NOT NULL,
  target_id   UUID NOT NULL,
  details     JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- jobs
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_date ON jobs(date);
CREATE INDEX idx_jobs_city ON jobs(city);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_status_date ON jobs(status, date);
CREATE INDEX idx_jobs_status_city ON jobs(status, city);
CREATE INDEX idx_jobs_status_category ON jobs(status, category);

-- job_applications
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_worker_id ON job_applications(worker_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_job_status ON job_applications(job_id, status);

-- payments
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_worker_id ON payments(worker_id);
CREATE INDEX idx_payments_company_id ON payments(company_id);

-- notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);

-- other useful indexes
CREATE INDEX idx_job_assignments_job_id ON job_assignments(job_id);
CREATE INDEX idx_job_assignments_worker_id ON job_assignments(worker_id);
CREATE INDEX idx_wallet_transactions_worker_id ON wallet_transactions(worker_id);
CREATE INDEX idx_reviews_reviewed_id ON reviews(reviewed_id);
CREATE INDEX idx_worker_documents_worker_id ON worker_documents(worker_id);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_reports_reported_id ON reports(reported_id);
CREATE INDEX idx_admin_actions_admin_id ON admin_actions(admin_id);
