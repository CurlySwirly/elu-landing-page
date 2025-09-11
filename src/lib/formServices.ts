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

export const formServices = {
  // Submit beta signup
  async submitBetaSignup(data: BetaSignupData) {
    try {
      const { data: result, error } = await supabase
        .from('beta_signups')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting beta signup:', error)
      // Preserve the original error object structure for error code checking
      return { success: false, error }
    }
  },

  // Submit contact message
  async submitContactMessage(data: ContactMessageData) {
    try {
      const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting contact message:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Submit expert application
  async submitExpertApplication(data: ExpertApplicationData) {
    try {
      const { data: result, error } = await supabase
        .from('expert_applications')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting expert application:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  },

  // Submit pricing info email
  async submitPricingInfoEmail(data: PricingInfoEmailData) {
    try {
      console.log('formServices.submitPricingInfoEmail called with:', data);
      console.log('Supabase client:', supabase);
      
      const { data: result, error } = await supabase
        .from('pricing_info_emails')
        .insert([data])
        .select()
        .single()

      console.log('Supabase response:', { result, error });

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting pricing info email:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}
