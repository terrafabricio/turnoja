import { z } from 'zod';
import { JOB_CATEGORIES } from '@/types';

// ---------------------------------------------------------------------------
// Address schema (reusable)
// ---------------------------------------------------------------------------

const CEP_REGEX = /^\d{5}-\d{3}$/;

export const addressSchema = z.object({
  street: z.string().min(3, 'Rua é obrigatória').max(200),
  number: z.string().min(1, 'Número é obrigatório').max(20),
  complement: z.string().max(100).optional().nullable(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório').max(100),
  city: z.string().min(2, 'Cidade é obrigatória').max(100),
  state: z
    .string()
    .length(2, 'UF deve ter 2 caracteres')
    .regex(/^[A-Z]{2}$/, 'UF inválida'),
  cep: z.string().regex(CEP_REGEX, 'CEP inválido. Use o formato 00000-000'),
});

// ---------------------------------------------------------------------------
// Geo-point schema
// ---------------------------------------------------------------------------

export const geoPointSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// ---------------------------------------------------------------------------
// Job category schema
// ---------------------------------------------------------------------------

const jobCategorySchema = z.enum(JOB_CATEGORIES);

// ---------------------------------------------------------------------------
// Time validation helper
// ---------------------------------------------------------------------------

const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, 'Horário inválido. Use o formato HH:MM');

// ---------------------------------------------------------------------------
// Create Job
// ---------------------------------------------------------------------------

export const createJobSchema = z
  .object({
    title: z
      .string()
      .min(5, 'Título deve ter pelo menos 5 caracteres')
      .max(120, 'Título deve ter no máximo 120 caracteres'),
    description: z
      .string()
      .min(20, 'Descrição deve ter pelo menos 20 caracteres')
      .max(5000, 'Descrição deve ter no máximo 5000 caracteres'),
    category: jobCategorySchema,
    address: addressSchema,
    geo: geoPointSchema.optional().nullable(),
    /** Pay rate in BRL cents per hour */
    pay_rate_cents: z
      .number()
      .int('Valor deve ser inteiro (centavos)')
      .min(100, 'Valor mínimo é R$ 1,00/hora')
      .max(100_000, 'Valor máximo é R$ 1.000,00/hora'),
    vacancies: z
      .number()
      .int('Número de vagas deve ser inteiro')
      .min(1, 'Mínimo de 1 vaga')
      .max(500, 'Máximo de 500 vagas'),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use o formato AAAA-MM-DD')
      .refine(
        (val) => new Date(val) >= new Date(new Date().toDateString()),
        'A data deve ser hoje ou no futuro',
      ),
    start_time: timeSchema,
    end_time: timeSchema,
    min_hours: z
      .number()
      .min(1, 'Mínimo de 1 hora')
      .max(24)
      .optional()
      .nullable(),
    requirements: z
      .array(z.string().min(2).max(200))
      .max(20, 'Máximo de 20 requisitos')
      .default([]),
    benefits: z
      .array(z.string().min(2).max(200))
      .max(20, 'Máximo de 20 benefícios')
      .default([]),
    dress_code: z.string().max(500).optional().nullable(),
    instructions: z.string().max(2000).optional().nullable(),
    is_recurring: z.boolean().default(false),
    recurrence_rule: z.string().max(500).optional().nullable(),
    application_deadline: z.string().datetime().optional().nullable(),
    /** Whether to publish immediately or save as draft */
    publish: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // end_time must be after start_time (or next day for overnight shifts)
      return data.start_time !== data.end_time;
    },
    {
      message: 'O horário de início e término não podem ser iguais',
      path: ['end_time'],
    },
  );

export type CreateJobInput = z.infer<typeof createJobSchema>;

// ---------------------------------------------------------------------------
// Edit Job (partial – only editable fields)
// ---------------------------------------------------------------------------

export const editJobSchema = createJobSchema.partial().omit({
  publish: true,
});

export type EditJobInput = z.infer<typeof editJobSchema>;

// ---------------------------------------------------------------------------
// Structured Job Requirement
// ---------------------------------------------------------------------------

export const jobRequirementSchema = z.object({
  type: z.enum([
    'experiencia',
    'documento',
    'habilidade',
    'uniforme',
    'outro',
  ]),
  description: z
    .string()
    .min(3, 'Descrição deve ter pelo menos 3 caracteres')
    .max(300),
  is_mandatory: z.boolean().default(true),
});

export type JobRequirementInput = z.infer<typeof jobRequirementSchema>;

// ---------------------------------------------------------------------------
// Apply to Job
// ---------------------------------------------------------------------------

export const applyToJobSchema = z.object({
  job_id: z.string().uuid('ID da vaga inválido'),
  cover_letter: z
    .string()
    .max(2000, 'Mensagem deve ter no máximo 2000 caracteres')
    .optional()
    .nullable(),
});

export type ApplyToJobInput = z.infer<typeof applyToJobSchema>;

// ---------------------------------------------------------------------------
// Cancel Application
// ---------------------------------------------------------------------------

export const cancelApplicationSchema = z.object({
  application_id: z.string().uuid('ID da candidatura inválido'),
});

export type CancelApplicationInput = z.infer<typeof cancelApplicationSchema>;

// ---------------------------------------------------------------------------
// Review Application (company accepting/rejecting)
// ---------------------------------------------------------------------------

export const reviewApplicationSchema = z.object({
  application_id: z.string().uuid('ID da candidatura inválido'),
  status: z.enum(['aceita', 'recusada']),
  rejection_reason: z.string().max(500).optional().nullable(),
});

export type ReviewApplicationInput = z.infer<typeof reviewApplicationSchema>;

// ---------------------------------------------------------------------------
// Job Search / Filter
// ---------------------------------------------------------------------------

export const jobSearchSchema = z.object({
  search: z.string().max(200).optional(),
  category: jobCategorySchema.optional(),
  city: z.string().max(100).optional(),
  state: z
    .string()
    .length(2)
    .regex(/^[A-Z]{2}$/)
    .optional(),
  min_pay_rate_cents: z.number().int().min(0).optional(),
  max_pay_rate_cents: z.number().int().min(0).optional(),
  date_from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  date_to: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  radius_km: z.number().min(1).max(200).optional(),
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(100).default(20),
  sort_by: z
    .enum(['date', 'pay_rate', 'distance', 'created_at'])
    .default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

export type JobSearchInput = z.infer<typeof jobSearchSchema>;
