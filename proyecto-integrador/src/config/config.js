import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://zlpvhxxrfpggxdddwcos.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscHZoeHhyZnBnZ3hkZGR3Y29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTMyNDAsImV4cCI6MjA3NjcyOTI0MH0.7Tk1aCERseGl5n_tmj0iZRkj09RLixcoGK-dQy_XFJY'

// Create Supabase client with options
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

export { supabase }
