import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://jhjxvhhavsxmgnjbrmbn.supabase.co" as string, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoanh2aGhhdnN4bWduamJybWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5ODg4NDMsImV4cCI6MjAzMTU2NDg0M30.hbH31wVRnUupSX3No6PpQ0rVJtmxbhCaBgCbp2extW0" as string)

export { supabase }