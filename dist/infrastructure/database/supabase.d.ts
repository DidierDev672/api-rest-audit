import { SupabaseClient } from '@supabase/supabase-js';
declare class SafeSupabaseClient {
    private supabaseClient;
    constructor(url: string, key: string);
    query<T>(operation: () => Promise<{
        data: T | null;
        error: any;
    }>): Promise<T>;
    getClient(): SupabaseClient<any>;
    from(table: string): import("@supabase/postgrest-js").PostgrestQueryBuilder<any, any, any, string, unknown>;
}
export declare const supabase: SafeSupabaseClient;
export {};
//# sourceMappingURL=supabase.d.ts.map