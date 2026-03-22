import { z } from 'zod';

// ---------------------------------------------------------------------------
// Regex patterns (Brazilian formats)
// ---------------------------------------------------------------------------

/** CPF: 000.000.000-00 */
const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

/** CNPJ: 00.000.000/0000-00 */
const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

/** Brazilian phone: (XX) XXXXX-XXXX or (XX) XXXX-XXXX */
const PHONE_REGEX = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Validate CPF check digits */
function isValidCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false; // all same digit

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== Number(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === Number(digits[10]);
}

/** Validate CNPJ check digits */
function isValidCnpj(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(digits[i]) * weights1[i];
  let rest = sum % 11;
  const d1 = rest < 2 ? 0 : 11 - rest;
  if (Number(digits[12]) !== d1) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(digits[i]) * weights2[i];
  rest = sum % 11;
  const d2 = rest < 2 ? 0 : 11 - rest;
  return Number(digits[13]) === d2;
}

// ---------------------------------------------------------------------------
// Reusable field schemas
// ---------------------------------------------------------------------------

export const emailSchema = z
  .string()
  .min(1, 'E-mail é obrigatório')
  .email('E-mail inválido');

export const passwordSchema = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .max(72, 'A senha deve ter no máximo 72 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'A senha deve conter pelo menos um número');

export const cpfSchema = z
  .string()
  .regex(CPF_REGEX, 'CPF inválido. Use o formato 000.000.000-00')
  .refine(isValidCpf, 'CPF inválido');

export const cnpjSchema = z
  .string()
  .regex(CNPJ_REGEX, 'CNPJ inválido. Use o formato 00.000.000/0000-00')
  .refine(isValidCnpj, 'CNPJ inválido');

export const phoneSchema = z
  .string()
  .regex(PHONE_REGEX, 'Telefone inválido. Use o formato (XX) XXXXX-XXXX');

export const fullNameSchema = z
  .string()
  .min(3, 'Nome deve ter pelo menos 3 caracteres')
  .max(120, 'Nome deve ter no máximo 120 caracteres')
  .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Nome contém caracteres inválidos');

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// Register – Company (empresa)
// ---------------------------------------------------------------------------

export const registerCompanySchema = z
  .object({
    // Account
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: z.string(),
    // Personal
    full_name: fullNameSchema,
    phone: phoneSchema,
    // Company
    company_name: z
      .string()
      .min(2, 'Razão social deve ter pelo menos 2 caracteres')
      .max(200, 'Razão social deve ter no máximo 200 caracteres'),
    trade_name: z
      .string()
      .max(200, 'Nome fantasia deve ter no máximo 200 caracteres')
      .optional(),
    cnpj: cnpjSchema,
    // Terms
    accept_terms: z.literal(true, {
      error: 'Você deve aceitar os termos de uso',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  });

export type RegisterCompanyInput = z.infer<typeof registerCompanySchema>;

// ---------------------------------------------------------------------------
// Register – Worker (trabalhador)
// ---------------------------------------------------------------------------

export const registerWorkerSchema = z
  .object({
    // Account
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: z.string(),
    // Personal
    full_name: fullNameSchema,
    phone: phoneSchema,
    cpf: cpfSchema,
    date_of_birth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida. Use AAAA-MM-DD')
      .refine(
        (val) => {
          const dob = new Date(val);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          return age >= 18;
        },
        'Você deve ter pelo menos 18 anos',
      ),
    // Terms
    accept_terms: z.literal(true, {
      error: 'Você deve aceitar os termos de uso',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  });

export type RegisterWorkerInput = z.infer<typeof registerWorkerSchema>;

// ---------------------------------------------------------------------------
// Password Reset – Request
// ---------------------------------------------------------------------------

export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export type PasswordResetRequestInput = z.infer<
  typeof passwordResetRequestSchema
>;

// ---------------------------------------------------------------------------
// Password Reset – Confirm (new password)
// ---------------------------------------------------------------------------

export const passwordResetConfirmSchema = z
  .object({
    password: passwordSchema,
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['password_confirmation'],
  });

export type PasswordResetConfirmInput = z.infer<
  typeof passwordResetConfirmSchema
>;

// ---------------------------------------------------------------------------
// Change Password (while logged in)
// ---------------------------------------------------------------------------

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'Senha atual é obrigatória'),
    new_password: passwordSchema,
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: 'As senhas não coincidem',
    path: ['new_password_confirmation'],
  })
  .refine((data) => data.current_password !== data.new_password, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['new_password'],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
