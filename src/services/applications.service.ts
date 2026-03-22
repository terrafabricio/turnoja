// ============================================================================
// TurnoJa - Applications Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type {
  JobApplication,
  ApplicationStatus,
  ApplicationWithJob,
  ApplicationWithWorker,
} from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Apply to a job
// ---------------------------------------------------------------------------

export async function applyToJob(
  jobId: string,
  workerProfileId: string,
  message?: string
): Promise<JobApplication> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      job_id: jobId,
      worker_profile_id: workerProfileId,
      cover_letter: message ?? null,
      status: 'pendente' as ApplicationStatus,
    })
    .select()
    .single()

  if (error) throw error
  return data as JobApplication
}

// ---------------------------------------------------------------------------
// Worker: get my applications
// ---------------------------------------------------------------------------

export async function getMyApplications(
  workerProfileId: string,
  status?: ApplicationStatus
): Promise<ApplicationWithJob[]> {
  const supabase = getSupabase()

  let query = supabase
    .from('job_applications')
    .select(
      `
      *,
      job:jobs (
        *,
        company_profile:company_profiles!company_profile_id (
          id,
          company_name,
          trade_name,
          logo_url,
          average_rating,
          is_verified
        )
      )
    `
    )
    .eq('worker_profile_id', workerProfileId)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return (data ?? []) as unknown as ApplicationWithJob[]
}

// ---------------------------------------------------------------------------
// Company: get applications for a job
// ---------------------------------------------------------------------------

export async function getJobApplications(
  jobId: string
): Promise<ApplicationWithWorker[]> {
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('job_applications')
    .select(
      `
      *,
      worker_profile:worker_profiles!worker_profile_id (
        id,
        profile_id,
        cpf,
        skills,
        categories,
        average_rating,
        total_jobs_completed,
        is_verified,
        profile:profiles!profile_id (
          full_name,
          avatar_url,
          phone
        )
      )
    `
    )
    .eq('job_id', jobId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as ApplicationWithWorker[]
}

// ---------------------------------------------------------------------------
// Company: respond to an application
// ---------------------------------------------------------------------------

export async function respondToApplication(
  applicationId: string,
  status: 'aceita' | 'recusada',
  rejectionReason?: string
): Promise<JobApplication> {
  const supabase = getSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('job_applications')
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.id ?? null,
      rejection_reason: status === 'recusada' ? (rejectionReason ?? null) : null,
    })
    .eq('id', applicationId)
    .select()
    .single()

  if (error) throw error
  return data as JobApplication
}

// ---------------------------------------------------------------------------
// Worker: cancel own application
// ---------------------------------------------------------------------------

export async function cancelApplication(
  applicationId: string
): Promise<JobApplication> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('job_applications')
    .update({ status: 'cancelada' as ApplicationStatus })
    .eq('id', applicationId)
    .select()
    .single()

  if (error) throw error
  return data as JobApplication
}
