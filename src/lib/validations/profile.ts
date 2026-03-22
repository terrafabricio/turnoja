import { z } from 'zod';
import { JOB_CATEGORIES } from '@/types';
import { addressSchema, geoPointSchema } from './jobs';
import {
  fullNameSchema,
  phoneSchema,
  cpfSchema,
  cnpjSchema,
} from './auth';

// ---------------------------------------------------------------------------
// Availability schemas
// ---------------------------------------------------------------------------

const availabilityWindowSchema = z.object({
  start: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Horário inválido. Use o formato HH:MM'),
  end: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Horário inválido. Use o formato HH:MM'),
});

const weeklyAvailabilitySchema = z.object({
  dom: z.array(availabilityWindowSchema).optional(),
  seg: z.array(availabilityWindowSchema).optional(),
  ter: z.array(availabilityWindowSchema).optional(),
  qua: z.array(availabilityWindowSchema).optional(),
  qui: z.array(availabilityWindowSchema).optional(),
  sex: z.array(availabilityWindowSchema).optional(),
  sab: z.array(availabilityWindowSchema).optional(),
});

// ---------------------------------------------------------------------------
// Update Profile (base – shared fields)
// ---------------------------------------------------------------------------

export const updateProfileSchema = z.object({
  full_name: fullNameSchema.optional(),
  phone: phoneSchema.optional(),
  avatar_url: z.string().url('URL inválida').optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ---------------------------------------------------------------------------
// Company Profile
// ---------------------------------------------------------------------------

export const companyProfileSchema = z.object({
  company_name: z
    .string()
    .min(2, 'Razão social deve ter pelo menos 2 caracteres')
    .max(200),
  trade_name: z.string().max(200).optional().nullable(),
  cnpj: cnpjSchema,
  description: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .nullable(),
  logo_url: z.string().url('URL inválida').optional().nullable(),
  website: z.string().url('URL inválida').optional().nullable(),
  address: addressSchema,
  geo: geoPointSchema.optional().nullable(),
  industry: z.string().max(100).optional().nullable(),
  employee_count: z
    .number()
    .int()
    .min(1)
    .max(1_000_000)
    .optional()
    .nullable(),
});

export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;

// ---------------------------------------------------------------------------
// Update Company Profile (all fields optional)
// ---------------------------------------------------------------------------

export const updateCompanyProfileSchema = companyProfileSchema.partial();

export type UpdateCompanyProfileInput = z.infer<
  typeof updateCompanyProfileSchema
>;

// ---------------------------------------------------------------------------
// Worker Profile
// ---------------------------------------------------------------------------

export const workerProfileSchema = z.object({
  cpf: cpfSchema,
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use AAAA-MM-DD'),
  bio: z
    .string()
    .max(1000, 'Bio deve ter no máximo 1000 caracteres')
    .optional()
    .nullable(),
  skills: z
    .array(z.string().min(2).max(100))
    .max(30, 'Máximo de 30 habilidades')
    .default([]),
  categories: z
    .array(z.enum(JOB_CATEGORIES))
    .min(1, 'Selecione pelo menos uma categoria')
    .max(12),
  experience_years: z
    .number()
    .int()
    .min(0)
    .max(50)
    .optional()
    .nullable(),
  address: addressSchema.optional().nullable(),
  geo: geoPointSchema.optional().nullable(),
  max_distance_km: z
    .number()
    .min(1, 'Distância mínima é 1 km')
    .max(200, 'Distância máxima é 200 km')
    .optional()
    .nullable(),
  availability: weeklyAvailabilitySchema.optional().nullable(),
  pix_key: z.string().max(100).optional().nullable(),
  pix_key_type: z
    .enum(['cpf', 'cnpj', 'email', 'phone', 'random'])
    .optional()
    .nullable(),
  bank_name: z.string().max(100).optional().nullable(),
});

export type WorkerProfileInput = z.infer<typeof workerProfileSchema>;

// ---------------------------------------------------------------------------
// Update Worker Profile (all fields optional)
// ---------------------------------------------------------------------------

export const updateWorkerProfileSchema = workerProfileSchema.partial();

export type UpdateWorkerProfileInput = z.infer<
  typeof updateWorkerProfileSchema
>;

// ---------------------------------------------------------------------------
// PIX Key (standalone update)
// ---------------------------------------------------------------------------

export const updatePixKeySchema = z
  .object({
    pix_key: z.string().min(1, 'Chave PIX é obrigatória').max(100),
    pix_key_type: z.enum(['cpf', 'cnpj', 'email', 'phone', 'random']),
    bank_name: z.string().max(100).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.pix_key_type === 'cpf') {
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(data.pix_key);
      }
      if (data.pix_key_type === 'cnpj') {
        return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(data.pix_key);
      }
      if (data.pix_key_type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.pix_key);
      }
      if (data.pix_key_type === 'phone') {
        return /^\+55\d{10,11}$/.test(data.pix_key);
      }
      // random key: UUID format
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        data.pix_key,
      );
    },
    {
      message: 'Formato da chave PIX inválido para o tipo selecionado',
      path: ['pix_key'],
    },
  );

export type UpdatePixKeyInput = z.infer<typeof updatePixKeySchema>;

// ---------------------------------------------------------------------------
// Document Upload
// ---------------------------------------------------------------------------

const DOCUMENT_TYPES = [
  'rg',
  'cpf',
  'comprovante_residencia',
  'certidao_negativa',
  'carteira_trabalho',
  'foto_perfil',
  'outro',
] as const;

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const documentUploadSchema = z.object({
  type: z.enum(DOCUMENT_TYPES),
  file_name: z
    .string()
    .min(1, 'Nome do arquivo é obrigatório')
    .max(255),
  file_size: z
    .number()
    .max(
      MAX_FILE_SIZE_MB * 1024 * 1024,
      `Arquivo deve ter no máximo ${MAX_FILE_SIZE_MB}MB`,
    ),
  mime_type: z
    .string()
    .refine(
      (val) => ACCEPTED_MIME_TYPES.includes(val),
      'Tipo de arquivo não aceito. Use JPEG, PNG, WebP ou PDF',
    ),
  expires_at: z.string().datetime().optional().nullable(),
});

export type DocumentUploadInput = z.infer<typeof documentUploadSchema>;

// ---------------------------------------------------------------------------
// Review submission
// ---------------------------------------------------------------------------

export const submitReviewSchema = z.object({
  job_id: z.string().uuid('ID da vaga inválido'),
  reviewed_profile_id: z.string().uuid('ID do perfil inválido'),
  rating: z
    .number()
    .int()
    .min(1, 'Avaliação mínima é 1')
    .max(5, 'Avaliação máxima é 5'),
  comment: z
    .string()
    .max(1000, 'Comentário deve ter no máximo 1000 caracteres')
    .optional()
    .nullable(),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
