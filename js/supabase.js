// js/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://qaxzckjvhpqrtnmvjmhp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFheHpja2p2aHBxcnRubXZqbWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjM0MTksImV4cCI6MjA4OTM5OTQxOX0.uZTFoW0rvD457xYGYRM401o-oS0BzFIE9u1_Ul-gpVg';

export const supabase = createClient(supabaseUrl, supabaseKey);
