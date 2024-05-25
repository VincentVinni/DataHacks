import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.supabaseUrl as string, process.env.supabaseKey as string)

export { supabase }