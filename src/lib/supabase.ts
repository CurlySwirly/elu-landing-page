import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      beta_signups: {
        Row: {
          id: string
          email: string
          created_at: string
          source: string
        }
        Insert: {
          email: string
          source?: string
        }
        Update: {
          email?: string
          source?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          message: string
        }
        Update: {
          name?: string
          email?: string
          message?: string
        }
      }
      expert_applications: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          expertise: string[]
          experience_years: number
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          phone: string
          expertise: string[]
          experience_years: number
          message: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          expertise?: string[]
          experience_years?: number
          message?: string
        }
      },
      pricing_info_emails: {
        Row: {
          id: string
          email: string
          plan_type: string
          created_at: string
        }
        Insert: {
          email: string
          plan_type: string
        }
        Update: {
          email?: string
          plan_type?: string
        }
      }
    }
  }
}
