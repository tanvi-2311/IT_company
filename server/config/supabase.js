import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ WARNING: SUPABASE_URL or SUPABASE_KEY is missing in your .env file!');
}

// Instantiate the official Supabase Javascript Client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('📡 Supabase Client initialized successfully.');

export default supabase;
