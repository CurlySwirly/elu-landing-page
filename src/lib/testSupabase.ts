// Test script to verify Supabase connection
// Run this in the browser console to test your setup

import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('beta_signups')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Response:', data);
    return true;
  } catch (error) {
    console.error('❌ Error testing Supabase:', error);
    return false;
  }
};

// Usage in browser console:
// import { testSupabaseConnection } from './lib/testSupabase';
// testSupabaseConnection();
