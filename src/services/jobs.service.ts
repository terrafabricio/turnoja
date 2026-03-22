// ============================================================================
// TurnoJa - Jobs Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type {
  Job,
  JobStatus,
  JobCategory,
  JobWithCompany,
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

export interface GetJobsFilters {
  category?: JobCategory
  city?: string
  status?: JobStatus
  search?: string
  page?: number
  limit?: number
  sortBy?: 'date' | 'pay_rate_cents' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getJobs(
  filters: GetJobsFilters = {}
): Promise<PaginatedResponse<JobWithCompany>> {
  const supabase = getSupabase()
  const {
    category,
    city,
    status = 'publicada',
    search,
    page = 1,
    limit = 20,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('jobs')
    .select(
      `
      *,
      company_profile:company_profiles!company_profile_id (
        id,
        company_name,
        trade_name,
        logo_url,
        average_rating,
        is_verified
      )
    `,
      { count: 'exact' }
    )
    .eq('status', status)

  if (category) {
    query = query.eq('category', category)
  }

  if (city) {
    query = query.ilike('address->>city', `%${city}%`)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  query = query.order(sortBy, { ascending: sortOrder === 'asc' }).range(from, to)

  const { data, error, count } = await query

  if (error) throw error

  const total = count ?? 0

  return {
    data: (data ?? []) as unknown as JobWithCompany[],
    total,
    page,
    per_page: limit,
    total_pages: Math.ceil(total / limit),
  }
}

export async function getJobById(id: string): Promise<JobWithCompany> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('jobs')
    .select(
      `
      *,
      company_profile:company_profiles!company_profile_id (
        id,
        company_name,
        trade_name,
        logo_url,
        average_rating,
        is_verified
      )
    `
    )
    .eq('id', id)
    .single()

  if (error) throw error
  return data as unknown as JobWithCompany
}

export async function createJob(
  jobData: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'filled_vacancies' | 'published_at' | 'started_at' | 'completed_at' | 'cancelled_at' | 'cancellation_reason'>
): Promise<Job> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single()

  if (error) throw error
  return data as Job
}

export async function updateJob(
  id: string,
  jobData: Partial<Job>
): Promise<Job> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('jobs')
    .update(jobData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Job
}

export async function deleteJob(id: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.from('jobs').delete().eq('id', id)

  if (error) throw error
}

export async function publishJob(id: string): Promise<Job> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('jobs')
    .update({
      status: 'publicada' as JobStatus,
      published_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Job
}
