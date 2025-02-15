
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orhiqemqxpqlkadywuvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaGlxZW1xeHBxbGthZHl3dXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDMzNTAsImV4cCI6MjA1NTIxOTM1MH0.2QTx2t7ut5uiv7iNNWg4eT6j4qIsMU6zcdzN8PqmNhA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
