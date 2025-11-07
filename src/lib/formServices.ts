import { supabase } from './supabase'

export interface BetaSignupData {
  email: string
  source?: string
}

export interface ContactMessageData {
  name: string
  email: string
  message: string
}

export interface ExpertApplicationData {
  name: string
  email: string
  phone: string
  expertise: string[]
  experience_years: number
  message: string
}

export interface PricingInfoEmailData {
  email: string
  plan_type: string
}

export interface NewsletterSubscriptionData {
  email: string
  source?: string
}

// Standardized response types
export interface FormResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string | unknown
}

// Supabase error type
interface SupabaseError {
  code?: string
  message?: string
  error_description?: string
}

// Helper function to extract error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return 'Unknown error'
}

// Helper function to check if error is Supabase error
function isSupabaseError(error: unknown): error is SupabaseError {
  return error !== null && typeof error === 'object' && ('code' in error || 'message' in error)
}

export const formServices = {
  // Submit beta signup
  async submitBetaSignup(data: BetaSignupData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('beta_signups')
        .insert([data])
        .select()
        .single()

      if (error) {
        throw error;
      }

      return { success: true, data: result }
    } catch (error) {
      return { success: false, error }
    }
  },

  // Submit contact message
  async submitContactMessage(data: ContactMessageData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting contact message:', error)
      }
      return { success: false, error: getErrorMessage(error) }
    }
  },

  // Submit expert application
  async submitExpertApplication(data: ExpertApplicationData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('expert_applications')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting expert application:', error)
      }
      return { success: false, error: getErrorMessage(error) }
    }
  },

  // Submit pricing info email
  async submitPricingInfoEmail(data: PricingInfoEmailData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('pricing_info_emails')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting pricing info email:', error)
      }
      return { success: false, error: getErrorMessage(error) }
    }
  },

  // Submit newsletter subscription
  async submitNewsletterSubscription(data: NewsletterSubscriptionData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([data])
        .select()
        .single()

      if (error) {
        // Log full error details in development
        if (import.meta.env.DEV) {
          console.error('Supabase error:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
            fullError: error
          })
        }
        // Handle duplicate email error (PostgreSQL unique constraint violation)
        if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
          return { success: false, error: 'Diese E-Mail-Adresse ist bereits angemeldet.' }
        }
        // Handle RLS policy errors
        if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission denied')) {
          return { success: false, error: 'Berechtigung verweigert. Bitte kontaktiere uns über das Kontaktformular.' }
        }
        // Handle table not found errors
        if (error.message?.includes('relation') || error.message?.includes('does not exist') || error.code === '42P01') {
          return { success: false, error: 'Newsletter-Tabelle existiert noch nicht. Bitte kontaktiere uns.' }
        }
        // Return user-friendly error message instead of throwing
        const errorMessage = error.message || 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.'
        return { success: false, error: errorMessage }
      }
      
      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting newsletter subscription:', error)
      }
      
      // Handle duplicate email error gracefully
      if (isSupabaseError(error)) {
        if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
          return { success: false, error: 'Diese E-Mail-Adresse ist bereits angemeldet.' }
        }
        // Handle RLS policy errors
        if (error.code === '42501' || error.message?.includes('policy')) {
          return { success: false, error: 'Berechtigung verweigert. Bitte kontaktiere uns.' }
        }
        // Handle table not found errors
        if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
          return { success: false, error: 'Newsletter-Tabelle existiert noch nicht. Bitte kontaktiere uns.' }
        }
      }
      
      // Generic error message
      const errorMessage = getErrorMessage(error)
      return { success: false, error: errorMessage || 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.' }
    }
  }
}

// Export type for form services
export type FormServices = typeof formServices
