import { Auth } from '@supabase/auth-ui-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://iwcdnjfpejtakgrtdilv.supabase.co ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Y2RuamZwZWp0YWtncnRkaWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODg3MjAsImV4cCI6MjAxNjE2NDcyMH0._V8w1G8d6JmcNgKsKu44cEobhlzGghR203-9s9orWbc')

const App = () => <Auth supabaseClient={supabase} />