// ============================================================================
// TurnoJa - Reviews Service
// ============================================================================

import { createBrowserClient } from '@supabase/ssr'
import type { Review, ReviewWithReviewer } from '@/types'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---------------------------------------------------------------------------
// Create a review
// ---------------------------------------------------------------------------

export interface CreateReviewData {
  job_id: string
  reviewer_profile_id: string
  reviewed_profile_id: string
  rating: number
  comment?: string
  is_from_company: boolean
}

export async function createReview(
  reviewData: CreateReviewData
): Promise<Review> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...reviewData,
      comment: reviewData.comment ?? null,
      is_visible: true,
    })
    .select()
    .single()

  if (error) throw error
  return data as Review
}

// ---------------------------------------------------------------------------
// Get reviews FOR a user (received reviews)
// ---------------------------------------------------------------------------

export async function getReviewsForUser(
  userId: string
): Promise<ReviewWithReviewer[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      reviewer:profiles!reviewer_profile_id (
        id,
        full_name,
        avatar_url
      )
    `
    )
    .eq('reviewed_profile_id', userId)
    .eq('is_visible', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as ReviewWithReviewer[]
}

// ---------------------------------------------------------------------------
// Get reviews BY a user (written reviews)
// ---------------------------------------------------------------------------

export async function getReviewsByUser(
  userId: string
): Promise<ReviewWithReviewer[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      reviewer:profiles!reviewer_profile_id (
        id,
        full_name,
        avatar_url
      )
    `
    )
    .eq('reviewer_profile_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as unknown as ReviewWithReviewer[]
}
