// ============================================================================
// TurnoJa - Notifications Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type { Notification } from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Get notifications
// ---------------------------------------------------------------------------

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('profile_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as Notification[]
}

// ---------------------------------------------------------------------------
// Get unread count
// ---------------------------------------------------------------------------

export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = getSupabase()
  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('profile_id', userId)
    .eq('read', false)

  if (error) throw error
  return count ?? 0
}

// ---------------------------------------------------------------------------
// Mark as read
// ---------------------------------------------------------------------------

export async function markAsRead(notificationId: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('id', notificationId)

  if (error) throw error
}

// ---------------------------------------------------------------------------
// Mark all as read
// ---------------------------------------------------------------------------

export async function markAllAsRead(userId: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('profile_id', userId)
    .eq('read', false)

  if (error) throw error
}
