import { supabase } from './supabase'
import { GENERIC_FORM_ERROR } from './formErrors'

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

export interface FormResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string | unknown
}

interface SupabaseError {
  code?: string
  message?: string
  error_description?: string
}

function isDuplicateEmail(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const candidate = error as SupabaseError
  return (
    candidate.code === '23505' ||
    Boolean(candidate.message?.includes('duplicate')) ||
    Boolean(candidate.message?.includes('unique'))
  )
}

export const formServices = {
  async submitBetaSignup(data: BetaSignupData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('beta_signups')
        .insert([data])
        .select()
        .single()

      if (error) {
        throw error
      }

      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting beta signup:', error)
      }
      if (isDuplicateEmail(error)) {
        return { success: false, error }
      }
      return { success: false, error: GENERIC_FORM_ERROR }
    }
  },

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
      return { success: false, error: GENERIC_FORM_ERROR }
    }
  },

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
      return { success: false, error: GENERIC_FORM_ERROR }
    }
  },

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
      return { success: false, error: GENERIC_FORM_ERROR }
    }
  },

  async submitNewsletterSubscription(data: NewsletterSubscriptionData): Promise<FormResponse> {
    try {
      const { data: result, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([data])
        .select()
        .single()

      if (error) {
        if (import.meta.env.DEV) {
          console.error('Supabase error:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
            fullError: error
          })
        }
        if (isDuplicateEmail(error)) {
          return { success: false, error: 'Diese E-Mail-Adresse ist bereits angemeldet.' }
        }
        return { success: false, error: GENERIC_FORM_ERROR }
      }

      return { success: true, data: result }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting newsletter subscription:', error)
      }
      if (isDuplicateEmail(error)) {
        return { success: false, error: 'Diese E-Mail-Adresse ist bereits angemeldet.' }
      }
      return { success: false, error: GENERIC_FORM_ERROR }
    }
  }
}

export type FormServices = typeof formServices
