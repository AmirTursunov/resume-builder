import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kqltodlspamlprjxwzlu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxbHRvZGxzcGFtbHByanh3emx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzE1MDQsImV4cCI6MjA2MTMwNzUwNH0.V9Hmz7v46QHuYKvujy-m3RVV7vwoZCWy65l4s53MQ0U";
export const supabase = createClient(supabaseUrl, supabaseKey);
