// ============================================================================
// TurnoJa - Profile Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type { Profile, CompanyProfile, WorkerProfile } from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Base Profile
// ---------------------------------------------------------------------------

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // not found
    throw error
  }
  return data as Profile
}

export async function updateProfile(
  userId: string,
  profileData: Partial<Pick<Profile, 'full_name' | 'phone' | 'avatar_url'>>
): Promise<Profile> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as Profile
}

// ---------------------------------------------------------------------------
// Company Profile
// ---------------------------------------------------------------------------

export async function getCompanyProfile(
  profileId: string
): Promise<CompanyProfile | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('company_profiles')
    .select('*')
    .eq('profile_id', profileId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as CompanyProfile
}

export async function updateCompanyProfile(
  profileId: string,
  companyData: Partial<
    Pick<
      CompanyProfile,
      | 'company_name'
      | 'trade_name'
      | 'description'
      | 'logo_url'
      | 'website'
      | 'address'
      | 'geo'
      | 'industry'
      | 'employee_count'
    >
  >
): Promise<CompanyProfile> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('company_profiles')
    .update(companyData)
    .eq('profile_id', profileId)
    .select()
    .single()

  if (error) throw error
  return data as CompanyProfile
}

// ---------------------------------------------------------------------------
// Worker Profile
// ---------------------------------------------------------------------------

export async function getWorkerProfile(
  profileId: string
): Promise<WorkerProfile | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('worker_profiles')
    .select('*')
    .eq('profile_id', profileId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data as WorkerProfile
}

export async function updateWorkerProfile(
  profileId: string,
  workerData: Partial<
    Pick<
      WorkerProfile,
      | 'bio'
      | 'skills'
      | 'categories'
      | 'experience_years'
      | 'address'
      | 'geo'
      | 'max_distance_km'
      | 'availability'
      | 'pix_key'
      | 'pix_key_type'
      | 'bank_name'
    >
  >
): Promise<WorkerProfile> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('worker_profiles')
    .update(workerData)
    .eq('profile_id', profileId)
    .select()
    .single()

  if (error) throw error
  return data as WorkerProfile
}

// ---------------------------------------------------------------------------
// Avatar Upload
// ---------------------------------------------------------------------------

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<string> {
  const supabase = getSupabase()
  const fileExt = file.name.split('.').pop()
  const filePath = `avatars/${userId}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath)

  // Update the profile with the new avatar URL
  await updateProfile(userId, { avatar_url: publicUrl })

  return publicUrl
}
