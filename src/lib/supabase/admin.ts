import { createClient } from '@supabase/supabase-js'

/**
 * Supabase admin client with service role key.
 * WARNING: This client bypasses Row Level Security.
 * Only use in server-side code (API routes, server actions).
 * NEVER expose this client or the service role key to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
