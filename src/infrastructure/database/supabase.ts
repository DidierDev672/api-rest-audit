import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { circuitBreaker } from '../resilience';
import { withRetry } from '../resilience';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

class SafeSupabaseClient {
  private supabaseClient: SupabaseClient<any>;

  constructor(url: string, key: string) {
    this.supabaseClient = createClient(url, key);
  }

  async query<T>(operation: () => Promise<{ data: T | null; error: any }>): Promise<T> {
    return circuitBreaker.execute(async () => {
      return withRetry(async () => {
        const { data, error } = await operation();
        if (error) {
          throw error;
        }
        return data as T;
      }, { maxAttempts: 3, initialDelay: 500 });
    });
  }

  getClient(): SupabaseClient<any> {
    return this.supabaseClient;
  }

  from(table: string) {
    return this.supabaseClient.from(table);
  }
}

export const supabase = new SafeSupabaseClient(supabaseUrl, supabaseKey);
