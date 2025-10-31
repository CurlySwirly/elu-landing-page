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
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          featured_image_url: string
          image_alt_text: string
          meta_title: string
          meta_description: string
          author_name: string
          published: boolean
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          slug: string
          excerpt: string
          content: string
          category: string
          featured_image_url: string
          image_alt_text: string
          meta_title: string
          meta_description: string
          author_name?: string
          published?: boolean
          published_at?: string
        }
        Update: {
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          category?: string
          featured_image_url?: string
          image_alt_text?: string
          meta_title?: string
          meta_description?: string
          author_name?: string
          published?: boolean
          published_at?: string
        }
      }
      newsletter_subscriptions: {
        Row: {
          id: string
          email: string
          source: string
          created_at: string
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
    }
  }
}

// Blog Post type for easier use
export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  featured_image_url: string
  image_alt_text: string
  meta_title: string
  meta_description: string
  author_name: string
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
}
