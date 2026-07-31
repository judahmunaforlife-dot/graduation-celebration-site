import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase =
  url && anonKey
    ? createClient<Database>(url, anonKey, {
        auth: { persistSession: false },
      })
    : null

export const isSupabaseConfigured = supabase !== null
