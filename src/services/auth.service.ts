// ============================================================================
// TurnoJa - Auth Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type { Profile } from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function signUp(
  email: string,
  password: string,
  role: 'empresa' | 'trabalhador',
  metadata?: Record<string, unknown>
) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role, ...metadata } },
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const supabase = getSupabase()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const supabase = getSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/api/auth/callback?next=/recuperar-senha`,
  })
  if (error) throw error
}

export async function getCurrentUser() {
  const supabase = getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data as Profile
}
