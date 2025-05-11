import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vwcicmjfgefjlumdetva.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Y2ljbWpmZ2Vmamx1bWRldHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTEzNzAsImV4cCI6MjA2MjM2NzM3MH0.Tn9NChyGz-qRL5Vgo09_b64hq7NIoWIHYPM9_Qd-zmI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;