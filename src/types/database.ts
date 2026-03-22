// ============================================================================
// TurnoJa - Database Types
// All types matching the Supabase database schema
// ============================================================================

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export type UserRole = 'empresa' | 'trabalhador' | 'admin';

export type JobStatus =
  | 'rascunho'
  | 'publicada'
  | 'em_andamento'
  | 'concluida'
  | 'cancelada';

export type ApplicationStatus =
  | 'pendente'
  | 'aceita'
  | 'recusada'
  | 'cancelada';

export type AssignmentStatus =
  | 'confirmado'
  | 'em_andamento'
  | 'concluido'
  | 'no_show'
  | 'cancelado';

export type PaymentStatus = 'pendente' | 'processando' | 'pago' | 'falhou';

export type DocumentStatus = 'pendente' | 'aprovado' | 'rejeitado';

export type AttendanceType = 'check_in' | 'check_out';

export type TicketStatus = 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';

export type ReportStatus =
  | 'pendente'
  | 'investigando'
  | 'resolvido'
  | 'descartado';

export type JobCategory =
  | 'eventos'
  | 'restaurante'
  | 'bar'
  | 'promotor'
  | 'reposicao'
  | 'logistica'
  | 'atendimento'
  | 'limpeza'
  | 'cozinha'
  | 'carga_descarga'
  | 'operacional'
  | 'outros';

// ---------------------------------------------------------------------------
// Shared / Utility Types
// ---------------------------------------------------------------------------

/** Brazilian address */
export interface Address {
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string; // UF (2 chars)
  cep: string; // 00000-000
}

/** Geo-coordinates for job locations */
export interface GeoPoint {
  lat: number;
  lng: number;
}

/** Base fields present on every table row */
interface BaseRow {
  id: string; // uuid
  created_at: string; // timestamptz as ISO string
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Auth / Profiles
// ---------------------------------------------------------------------------

/** profiles – extends auth.users */
export interface Profile extends BaseRow {
  email: string;
  role: UserRole;
  full_name: string;
  phone: string | null; // +55 (XX) XXXXX-XXXX
  avatar_url: string | null;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  last_login_at: string | null;
}

/** company_profiles – extra data for role='empresa' */
export interface CompanyProfile extends BaseRow {
  profile_id: string; // FK → profiles.id
  company_name: string;
  trade_name: string | null; // nome fantasia
  cnpj: string; // 00.000.000/0000-00
  description: string | null;
  logo_url: string | null;
  website: string | null;
  address: Address;
  geo: GeoPoint | null;
  industry: string | null;
  employee_count: number | null;
  average_rating: number; // 0-5
  total_reviews: number;
  is_verified: boolean;
}

/** worker_profiles – extra data for role='trabalhador' */
export interface WorkerProfile extends BaseRow {
  profile_id: string; // FK → profiles.id
  cpf: string; // 000.000.000-00
  date_of_birth: string; // date YYYY-MM-DD
  bio: string | null;
  skills: string[];
  categories: JobCategory[];
  experience_years: number | null;
  address: Address | null;
  geo: GeoPoint | null;
  max_distance_km: number | null;
  availability: WeeklyAvailability | null;
  average_rating: number; // 0-5
  total_reviews: number;
  total_jobs_completed: number;
  is_verified: boolean;
  pix_key: string | null;
  pix_key_type: PixKeyType | null;
  bank_name: string | null;
}

export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';

/** Per-day availability windows */
export interface WeeklyAvailability {
  dom?: AvailabilityWindow[];
  seg?: AvailabilityWindow[];
  ter?: AvailabilityWindow[];
  qua?: AvailabilityWindow[];
  qui?: AvailabilityWindow[];
  sex?: AvailabilityWindow[];
  sab?: AvailabilityWindow[];
}

export interface AvailabilityWindow {
  start: string; // HH:mm
  end: string; // HH:mm
}

// ---------------------------------------------------------------------------
// Worker Documents
// ---------------------------------------------------------------------------

export interface WorkerDocument extends BaseRow {
  worker_profile_id: string; // FK → worker_profiles.id
  type: DocumentType;
  file_url: string;
  file_name: string;
  status: DocumentStatus;
  reviewed_by: string | null; // FK → profiles.id (admin)
  reviewed_at: string | null;
  rejection_reason: string | null;
  expires_at: string | null;
}

export type DocumentType =
  | 'rg'
  | 'cpf'
  | 'comprovante_residencia'
  | 'certidao_negativa'
  | 'carteira_trabalho'
  | 'foto_perfil'
  | 'outro';

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export interface Job extends BaseRow {
  company_profile_id: string; // FK → company_profiles.id
  title: string;
  description: string;
  category: JobCategory;
  status: JobStatus;
  address: Address;
  geo: GeoPoint | null;
  /** Pay rate in BRL cents per hour */
  pay_rate_cents: number;
  /** Total estimated value in BRL cents */
  total_value_cents: number | null;
  vacancies: number;
  filled_vacancies: number;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  /** Minimum hours (for flexible jobs) */
  min_hours: number | null;
  requirements: string[];
  benefits: string[];
  dress_code: string | null;
  instructions: string | null;
  is_recurring: boolean;
  recurrence_rule: string | null; // iCal RRULE or custom
  application_deadline: string | null; // timestamptz
  published_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
}

// ---------------------------------------------------------------------------
// Job Requirements (structured)
// ---------------------------------------------------------------------------

export interface JobRequirement extends BaseRow {
  job_id: string; // FK → jobs.id
  type: RequirementType;
  description: string;
  is_mandatory: boolean;
}

export type RequirementType =
  | 'experiencia'
  | 'documento'
  | 'habilidade'
  | 'uniforme'
  | 'outro';

// ---------------------------------------------------------------------------
// Job Applications
// ---------------------------------------------------------------------------

export interface JobApplication extends BaseRow {
  job_id: string; // FK → jobs.id
  worker_profile_id: string; // FK → worker_profiles.id
  status: ApplicationStatus;
  cover_letter: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null; // FK → profiles.id
  rejection_reason: string | null;
}

// ---------------------------------------------------------------------------
// Job Assignments
// ---------------------------------------------------------------------------

export interface JobAssignment extends BaseRow {
  job_id: string;
  worker_profile_id: string;
  application_id: string | null; // FK → job_applications.id
  status: AssignmentStatus;
  confirmed_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  hours_worked: number | null;
  /** Final amount in BRL cents */
  amount_cents: number | null;
  company_notes: string | null;
  worker_notes: string | null;
}

// ---------------------------------------------------------------------------
// Shifts
// ---------------------------------------------------------------------------

export interface Shift extends BaseRow {
  job_id: string;
  assignment_id: string; // FK → job_assignments.id
  date: string; // YYYY-MM-DD
  scheduled_start: string; // HH:mm
  scheduled_end: string; // HH:mm
  actual_start: string | null;
  actual_end: string | null;
  break_minutes: number;
  status: AssignmentStatus;
  notes: string | null;
}

// ---------------------------------------------------------------------------
// Attendance Logs
// ---------------------------------------------------------------------------

export interface AttendanceLog extends BaseRow {
  shift_id: string; // FK → shifts.id
  worker_profile_id: string;
  type: AttendanceType;
  timestamp: string; // timestamptz
  geo: GeoPoint | null;
  photo_url: string | null;
  verified: boolean;
  verified_by: string | null;
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export interface Payment extends BaseRow {
  assignment_id: string; // FK → job_assignments.id
  company_profile_id: string;
  worker_profile_id: string;
  /** Gross amount in BRL cents */
  gross_amount_cents: number;
  /** Platform fee in BRL cents */
  platform_fee_cents: number;
  /** Net amount in BRL cents (paid to worker) */
  net_amount_cents: number;
  status: PaymentStatus;
  payment_method: PaymentMethod | null;
  external_payment_id: string | null;
  paid_at: string | null;
  failed_at: string | null;
  failure_reason: string | null;
  receipt_url: string | null;
}

export type PaymentMethod = 'pix' | 'boleto' | 'transferencia' | 'plataforma';

// ---------------------------------------------------------------------------
// Wallet / Transactions
// ---------------------------------------------------------------------------

export interface WalletTransaction extends BaseRow {
  profile_id: string; // FK → profiles.id
  type: TransactionType;
  /** Amount in BRL cents (positive = credit, negative = debit) */
  amount_cents: number;
  balance_after_cents: number;
  description: string;
  reference_type: string | null; // e.g. 'payment', 'withdrawal'
  reference_id: string | null;
  status: PaymentStatus;
}

export type TransactionType =
  | 'credito'
  | 'debito'
  | 'saque'
  | 'reembolso'
  | 'taxa';

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export interface Review extends BaseRow {
  job_id: string;
  reviewer_profile_id: string; // FK → profiles.id
  reviewed_profile_id: string; // FK → profiles.id
  rating: number; // 1-5
  comment: string | null;
  is_from_company: boolean;
  is_visible: boolean;
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export interface Notification extends BaseRow {
  profile_id: string; // FK → profiles.id
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  read: boolean;
  read_at: string | null;
}

export type NotificationType =
  | 'nova_vaga'
  | 'candidatura_aceita'
  | 'candidatura_recusada'
  | 'turno_proximo'
  | 'pagamento_recebido'
  | 'avaliacao_recebida'
  | 'documento_aprovado'
  | 'documento_rejeitado'
  | 'mensagem'
  | 'sistema';

// ---------------------------------------------------------------------------
// Support Tickets
// ---------------------------------------------------------------------------

export interface SupportTicket extends BaseRow {
  profile_id: string; // FK → profiles.id
  subject: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  assigned_to: string | null; // FK → profiles.id (admin)
  resolved_at: string | null;
  attachments: string[];
}

export type TicketCategory =
  | 'pagamento'
  | 'vaga'
  | 'conta'
  | 'denuncia'
  | 'bug'
  | 'sugestao'
  | 'outro';

export type TicketPriority = 'baixa' | 'media' | 'alta' | 'urgente';

// ---------------------------------------------------------------------------
// Reports (user reports / complaints)
// ---------------------------------------------------------------------------

export interface Report extends BaseRow {
  reporter_profile_id: string; // FK → profiles.id
  reported_profile_id: string | null; // FK → profiles.id
  reported_job_id: string | null; // FK → jobs.id
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  resolution_notes: string | null;
}

export type ReportReason =
  | 'fraude'
  | 'assedio'
  | 'discriminacao'
  | 'pagamento'
  | 'no_show'
  | 'comportamento'
  | 'informacao_falsa'
  | 'outro';

// ---------------------------------------------------------------------------
// Admin Actions (audit log)
// ---------------------------------------------------------------------------

export interface AdminAction extends BaseRow {
  admin_profile_id: string; // FK → profiles.id
  action: AdminActionType;
  target_type: string; // table name
  target_id: string;
  details: Record<string, unknown> | null;
  ip_address: string | null;
}

export type AdminActionType =
  | 'aprovar'
  | 'rejeitar'
  | 'suspender'
  | 'reativar'
  | 'excluir'
  | 'editar'
  | 'resolver_ticket'
  | 'resolver_denuncia';

// ---------------------------------------------------------------------------
// Database (full schema map – useful for Supabase typed client)
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      profiles: TableDef<Profile>;
      company_profiles: TableDef<CompanyProfile>;
      worker_profiles: TableDef<WorkerProfile>;
      worker_documents: TableDef<WorkerDocument>;
      jobs: TableDef<Job>;
      job_requirements: TableDef<JobRequirement>;
      job_applications: TableDef<JobApplication>;
      job_assignments: TableDef<JobAssignment>;
      shifts: TableDef<Shift>;
      attendance_logs: TableDef<AttendanceLog>;
      payments: TableDef<Payment>;
      wallet_transactions: TableDef<WalletTransaction>;
      reviews: TableDef<Review>;
      notifications: TableDef<Notification>;
      support_tickets: TableDef<SupportTicket>;
      reports: TableDef<Report>;
      admin_actions: TableDef<AdminAction>;
    };
    Enums: {
      user_role: UserRole;
      job_status: JobStatus;
      application_status: ApplicationStatus;
      assignment_status: AssignmentStatus;
      payment_status: PaymentStatus;
      document_status: DocumentStatus;
      attendance_type: AttendanceType;
      ticket_status: TicketStatus;
      report_status: ReportStatus;
      job_category: JobCategory;
    };
  };
}

/** Helper: maps a Row type to Supabase table definition shape */
interface TableDef<T> {
  Row: T;
  Insert: Partial<T> & Omit<T, keyof BaseRow>;
  Update: Partial<T>;
}
