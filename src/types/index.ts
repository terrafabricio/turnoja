// ============================================================================
// TurnoJa - Type Re-exports & Derived Types
// ============================================================================

// Re-export everything from database types
export * from './database';

// ---------------------------------------------------------------------------
// Enum-like const objects (useful for iteration, selects, etc.)
// ---------------------------------------------------------------------------

export const USER_ROLES = ['empresa', 'trabalhador', 'admin'] as const;

export const JOB_STATUSES = [
  'rascunho',
  'publicada',
  'em_andamento',
  'concluida',
  'cancelada',
] as const;

export const APPLICATION_STATUSES = [
  'pendente',
  'aceita',
  'recusada',
  'cancelada',
] as const;

export const ASSIGNMENT_STATUSES = [
  'confirmado',
  'em_andamento',
  'concluido',
  'no_show',
  'cancelado',
] as const;

export const PAYMENT_STATUSES = [
  'pendente',
  'processando',
  'pago',
  'falhou',
] as const;

export const DOCUMENT_STATUSES = [
  'pendente',
  'aprovado',
  'rejeitado',
] as const;

export const ATTENDANCE_TYPES = ['check_in', 'check_out'] as const;

export const TICKET_STATUSES = [
  'aberto',
  'em_andamento',
  'resolvido',
  'fechado',
] as const;

export const REPORT_STATUSES = [
  'pendente',
  'investigando',
  'resolvido',
  'descartado',
] as const;

export const JOB_CATEGORIES = [
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
  'outros',
] as const;

// ---------------------------------------------------------------------------
// Display labels (PT-BR)
// ---------------------------------------------------------------------------

export const JOB_CATEGORY_LABELS: Record<
  (typeof JOB_CATEGORIES)[number],
  string
> = {
  eventos: 'Eventos',
  restaurante: 'Restaurante',
  bar: 'Bar',
  promotor: 'Promotor',
  reposicao: 'Reposição',
  logistica: 'Logística',
  atendimento: 'Atendimento',
  limpeza: 'Limpeza',
  cozinha: 'Cozinha',
  carga_descarga: 'Carga e Descarga',
  operacional: 'Operacional',
  outros: 'Outros',
};

export const JOB_STATUS_LABELS: Record<
  (typeof JOB_STATUSES)[number],
  string
> = {
  rascunho: 'Rascunho',
  publicada: 'Publicada',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

export const APPLICATION_STATUS_LABELS: Record<
  (typeof APPLICATION_STATUSES)[number],
  string
> = {
  pendente: 'Pendente',
  aceita: 'Aceita',
  recusada: 'Recusada',
  cancelada: 'Cancelada',
};

export const PAYMENT_STATUS_LABELS: Record<
  (typeof PAYMENT_STATUSES)[number],
  string
> = {
  pendente: 'Pendente',
  processando: 'Processando',
  pago: 'Pago',
  falhou: 'Falhou',
};

// ---------------------------------------------------------------------------
// Brazilian states (UF)
// ---------------------------------------------------------------------------

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const;

export type BrazilianState = (typeof BRAZILIAN_STATES)[number];

// ---------------------------------------------------------------------------
// Derived / Composite Types
// ---------------------------------------------------------------------------

import type {
  Profile,
  CompanyProfile,
  WorkerProfile,
  Job,
  JobApplication,
  WorkerDocument,
  Review,
} from './database';

/** Profile with company details attached */
export interface CompanyUser extends Profile {
  company_profile: CompanyProfile;
}

/** Profile with worker details attached */
export interface WorkerUser extends Profile {
  worker_profile: WorkerProfile & {
    documents: WorkerDocument[];
  };
}

/** Job with company info for listing pages */
export interface JobWithCompany extends Job {
  company_profile: Pick<
    CompanyProfile,
    'id' | 'company_name' | 'trade_name' | 'logo_url' | 'average_rating' | 'is_verified'
  >;
}

/** Job application with worker info (for company view) */
export interface ApplicationWithWorker extends JobApplication {
  worker_profile: Pick<
    WorkerProfile,
    'id' | 'profile_id' | 'cpf' | 'skills' | 'categories' | 'average_rating' | 'total_jobs_completed' | 'is_verified'
  > & {
    profile: Pick<Profile, 'full_name' | 'avatar_url' | 'phone'>;
  };
}

/** Job application with job info (for worker view) */
export interface ApplicationWithJob extends JobApplication {
  job: JobWithCompany;
}

/** Review with reviewer info */
export interface ReviewWithReviewer extends Review {
  reviewer: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>;
}

// ---------------------------------------------------------------------------
// Pagination & Filters
// ---------------------------------------------------------------------------

export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface JobFilters {
  category?: (typeof JOB_CATEGORIES)[number];
  city?: string;
  state?: BrazilianState;
  min_pay_rate_cents?: number;
  max_pay_rate_cents?: number;
  date_from?: string;
  date_to?: string;
  search?: string;
  lat?: number;
  lng?: number;
  radius_km?: number;
}

// ---------------------------------------------------------------------------
// API Response helpers
// ---------------------------------------------------------------------------

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };
