-- ============================================================
-- TurnoJa - Row Level Security Policies
-- ============================================================

-- ============================================================
-- Enable RLS on all tables
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper: check if current user is admin
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PROFILES
-- ============================================================

-- Users can read their own profile
CREATE POLICY profiles_select_own ON profiles
  FOR SELECT USING (id = auth.uid());

-- Admins can read all profiles
CREATE POLICY profiles_select_admin ON profiles
  FOR SELECT USING (is_admin());

-- Users can update their own profile
CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Users can insert their own profile (on signup)
CREATE POLICY profiles_insert_own ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- ============================================================
-- COMPANY_PROFILES
-- ============================================================

-- Owner can do everything with their company profile
CREATE POLICY company_profiles_select_own ON company_profiles
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY company_profiles_insert_own ON company_profiles
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY company_profiles_update_own ON company_profiles
  FOR UPDATE USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY company_profiles_delete_own ON company_profiles
  FOR DELETE USING (profile_id = auth.uid());

-- Authenticated users can read verified company profiles
CREATE POLICY company_profiles_select_verified ON company_profiles
  FOR SELECT USING (
    auth.role() = 'authenticated' AND is_verified = TRUE
  );

-- Admins can read all company profiles
CREATE POLICY company_profiles_select_admin ON company_profiles
  FOR SELECT USING (is_admin());

-- ============================================================
-- WORKER_PROFILES
-- ============================================================

-- Owner can do everything with their worker profile
CREATE POLICY worker_profiles_select_own ON worker_profiles
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY worker_profiles_insert_own ON worker_profiles
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY worker_profiles_update_own ON worker_profiles
  FOR UPDATE USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY worker_profiles_delete_own ON worker_profiles
  FOR DELETE USING (profile_id = auth.uid());

-- Authenticated users can read verified worker profiles
CREATE POLICY worker_profiles_select_verified ON worker_profiles
  FOR SELECT USING (
    auth.role() = 'authenticated' AND is_verified = TRUE
  );

-- Admins can read all worker profiles
CREATE POLICY worker_profiles_select_admin ON worker_profiles
  FOR SELECT USING (is_admin());

-- ============================================================
-- WORKER_DOCUMENTS
-- ============================================================

-- Worker can CRUD their own documents
CREATE POLICY worker_documents_select_own ON worker_documents
  FOR SELECT USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY worker_documents_insert_own ON worker_documents
  FOR INSERT WITH CHECK (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY worker_documents_update_own ON worker_documents
  FOR UPDATE USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY worker_documents_delete_own ON worker_documents
  FOR DELETE USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Admins can read all documents
CREATE POLICY worker_documents_select_admin ON worker_documents
  FOR SELECT USING (is_admin());

-- Admins can update documents (for review)
CREATE POLICY worker_documents_update_admin ON worker_documents
  FOR UPDATE USING (is_admin());

-- ============================================================
-- JOBS
-- ============================================================

-- Company owner can do everything with their jobs
CREATE POLICY jobs_select_own ON jobs
  FOR SELECT USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY jobs_insert_own ON jobs
  FOR INSERT WITH CHECK (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY jobs_update_own ON jobs
  FOR UPDATE USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

CREATE POLICY jobs_delete_own ON jobs
  FOR DELETE USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

-- Authenticated users can read published jobs
CREATE POLICY jobs_select_published ON jobs
  FOR SELECT USING (
    auth.role() = 'authenticated' AND status = 'publicada'
  );

-- Admins can read all jobs
CREATE POLICY jobs_select_admin ON jobs
  FOR SELECT USING (is_admin());

-- ============================================================
-- JOB_APPLICATIONS
-- ============================================================

-- Worker can create applications
CREATE POLICY job_applications_insert_worker ON job_applications
  FOR INSERT WITH CHECK (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Worker can read their own applications
CREATE POLICY job_applications_select_worker ON job_applications
  FOR SELECT USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Worker can update their own applications (e.g. cancel)
CREATE POLICY job_applications_update_worker ON job_applications
  FOR UPDATE USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Company owner can read applications for their jobs
CREATE POLICY job_applications_select_company ON job_applications
  FOR SELECT USING (
    job_id IN (
      SELECT j.id FROM jobs j
      JOIN company_profiles cp ON j.company_id = cp.id
      WHERE cp.profile_id = auth.uid()
    )
  );

-- Company owner can update applications for their jobs (accept/reject)
CREATE POLICY job_applications_update_company ON job_applications
  FOR UPDATE USING (
    job_id IN (
      SELECT j.id FROM jobs j
      JOIN company_profiles cp ON j.company_id = cp.id
      WHERE cp.profile_id = auth.uid()
    )
  );

-- Admins can read all applications
CREATE POLICY job_applications_select_admin ON job_applications
  FOR SELECT USING (is_admin());

-- ============================================================
-- JOB_ASSIGNMENTS
-- ============================================================

-- Involved worker can read
CREATE POLICY job_assignments_select_worker ON job_assignments
  FOR SELECT USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Involved company can read
CREATE POLICY job_assignments_select_company ON job_assignments
  FOR SELECT USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

-- Company can insert assignments (after accepting application)
CREATE POLICY job_assignments_insert_company ON job_assignments
  FOR INSERT WITH CHECK (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

-- Company can update assignments
CREATE POLICY job_assignments_update_company ON job_assignments
  FOR UPDATE USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

-- Admins can read all assignments
CREATE POLICY job_assignments_select_admin ON job_assignments
  FOR SELECT USING (is_admin());

-- ============================================================
-- ATTENDANCE_LOGS
-- ============================================================

-- Worker can read attendance for their own assignments
CREATE POLICY attendance_logs_select_worker ON attendance_logs
  FOR SELECT USING (
    assignment_id IN (
      SELECT ja.id FROM job_assignments ja
      JOIN worker_profiles wp ON ja.worker_id = wp.id
      WHERE wp.profile_id = auth.uid()
    )
  );

-- Worker can insert attendance for their own assignments
CREATE POLICY attendance_logs_insert_worker ON attendance_logs
  FOR INSERT WITH CHECK (
    assignment_id IN (
      SELECT ja.id FROM job_assignments ja
      JOIN worker_profiles wp ON ja.worker_id = wp.id
      WHERE wp.profile_id = auth.uid()
    )
  );

-- Company can read attendance for their assignments
CREATE POLICY attendance_logs_select_company ON attendance_logs
  FOR SELECT USING (
    assignment_id IN (
      SELECT ja.id FROM job_assignments ja
      JOIN company_profiles cp ON ja.company_id = cp.id
      WHERE cp.profile_id = auth.uid()
    )
  );

-- Admins can read all
CREATE POLICY attendance_logs_select_admin ON attendance_logs
  FOR SELECT USING (is_admin());

-- ============================================================
-- PAYMENTS
-- ============================================================

-- Worker can read their own payments
CREATE POLICY payments_select_worker ON payments
  FOR SELECT USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Company can read their own payments
CREATE POLICY payments_select_company ON payments
  FOR SELECT USING (
    company_id IN (SELECT id FROM company_profiles WHERE profile_id = auth.uid())
  );

-- Admins can read all payments
CREATE POLICY payments_select_admin ON payments
  FOR SELECT USING (is_admin());

-- ============================================================
-- WALLET_TRANSACTIONS
-- ============================================================

-- Worker can read their own transactions
CREATE POLICY wallet_transactions_select_own ON wallet_transactions
  FOR SELECT USING (
    worker_id IN (SELECT id FROM worker_profiles WHERE profile_id = auth.uid())
  );

-- Admins can read all
CREATE POLICY wallet_transactions_select_admin ON wallet_transactions
  FOR SELECT USING (is_admin());

-- ============================================================
-- REVIEWS
-- ============================================================

-- Anyone authenticated can read reviews
CREATE POLICY reviews_select_all ON reviews
  FOR SELECT USING (auth.role() = 'authenticated');

-- Reviewer can create a review
CREATE POLICY reviews_insert_own ON reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- Admins can manage reviews
CREATE POLICY reviews_select_admin ON reviews
  FOR SELECT USING (is_admin());

CREATE POLICY reviews_delete_admin ON reviews
  FOR DELETE USING (is_admin());

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

-- User can read their own notifications
CREATE POLICY notifications_select_own ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- User can update their own notifications (mark as read)
CREATE POLICY notifications_update_own ON notifications
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- SUPPORT_TICKETS
-- ============================================================

-- User can CRUD their own tickets
CREATE POLICY support_tickets_select_own ON support_tickets
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY support_tickets_insert_own ON support_tickets
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY support_tickets_update_own ON support_tickets
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY support_tickets_delete_own ON support_tickets
  FOR DELETE USING (user_id = auth.uid());

-- Admins can read all tickets
CREATE POLICY support_tickets_select_admin ON support_tickets
  FOR SELECT USING (is_admin());

-- Admins can update tickets (assign, resolve)
CREATE POLICY support_tickets_update_admin ON support_tickets
  FOR UPDATE USING (is_admin());

-- ============================================================
-- REPORTS
-- ============================================================

-- Reporter can create reports
CREATE POLICY reports_insert_own ON reports
  FOR INSERT WITH CHECK (reporter_id = auth.uid());

-- Reporter can read their own reports
CREATE POLICY reports_select_own ON reports
  FOR SELECT USING (reporter_id = auth.uid());

-- Admins can read all reports
CREATE POLICY reports_select_admin ON reports
  FOR SELECT USING (is_admin());

-- Admins can update reports
CREATE POLICY reports_update_admin ON reports
  FOR UPDATE USING (is_admin());

-- ============================================================
-- ADMIN_ACTIONS
-- ============================================================

-- Only admins can insert
CREATE POLICY admin_actions_insert ON admin_actions
  FOR INSERT WITH CHECK (is_admin());

-- Only admins can read
CREATE POLICY admin_actions_select ON admin_actions
  FOR SELECT USING (is_admin());
