// ============================================================================
// TurnoJa - Payments Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type {
  Payment,
  PaymentStatus,
  WalletTransaction,
  TransactionType,
  PaginatedResponse,
} from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Filters
// ---------------------------------------------------------------------------

export interface GetPaymentsFilters {
  companyProfileId?: string
  workerProfileId?: string
  status?: PaymentStatus
  page?: number
  limit?: number
}

export interface GetTransactionsFilters {
  type?: TransactionType
  status?: PaymentStatus
  page?: number
  limit?: number
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export async function getPayments(
  filters: GetPaymentsFilters = {}
): Promise<PaginatedResponse<Payment>> {
  const supabase = getSupabase()
  const { companyProfileId, workerProfileId, status, page = 1, limit = 20 } = filters
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('payments')
    .select('*', { count: 'exact' })

  if (companyProfileId) {
    query = query.eq('company_profile_id', companyProfileId)
  }

  if (workerProfileId) {
    query = query.eq('worker_profile_id', workerProfileId)
  }

  if (status) {
    query = query.eq('status', status)
  }

  query = query.order('created_at', { ascending: false }).range(from, to)

  const { data, error, count } = await query

  if (error) throw error

  const total = count ?? 0

  return {
    data: (data ?? []) as Payment[],
    total,
    page,
    per_page: limit,
    total_pages: Math.ceil(total / limit),
  }
}

// ---------------------------------------------------------------------------
// Wallet Balance
// ---------------------------------------------------------------------------

export async function getWalletBalance(
  workerId: string
): Promise<{ balance_cents: number }> {
  const supabase = getSupabase()

  // Get the latest transaction to read balance_after_cents
  const { data, error } = await supabase
    .from('wallet_transactions')
    .select('balance_after_cents')
    .eq('profile_id', workerId)
    .eq('status', 'pago')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error

  return { balance_cents: data?.balance_after_cents ?? 0 }
}

// ---------------------------------------------------------------------------
// Wallet Transactions
// ---------------------------------------------------------------------------

export async function getWalletTransactions(
  workerId: string,
  filters: GetTransactionsFilters = {}
): Promise<PaginatedResponse<WalletTransaction>> {
  const supabase = getSupabase()
  const { type, status, page = 1, limit = 20 } = filters
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('wallet_transactions')
    .select('*', { count: 'exact' })
    .eq('profile_id', workerId)

  if (type) {
    query = query.eq('type', type)
  }

  if (status) {
    query = query.eq('status', status)
  }

  query = query.order('created_at', { ascending: false }).range(from, to)

  const { data, error, count } = await query

  if (error) throw error

  const total = count ?? 0

  return {
    data: (data ?? []) as WalletTransaction[],
    total,
    page,
    per_page: limit,
    total_pages: Math.ceil(total / limit),
  }
}
