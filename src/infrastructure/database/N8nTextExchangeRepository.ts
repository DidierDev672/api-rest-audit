import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import {
  CreateN8nTextExchangeInput,
  IN8nTextExchangeRepository,
} from '../../domain/repositories/IN8nTextExchangeRepository';
import { N8nTextExchange } from '../../domain/entities/N8nIntegration';

export class N8nTextExchangeRepository implements IN8nTextExchangeRepository {
  private readonly table = 'n8n_text_exchanges';

  async create(data: CreateN8nTextExchangeInput): Promise<N8nTextExchange> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        webhook_log_id: data.webhookLogId ?? null,
        request_text: data.requestText,
        response_text: data.responseText ?? null,
        request_metadata: data.requestMetadata ?? {},
        response_metadata: data.responseMetadata ?? {},
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findById(id: string): Promise<N8nTextExchange | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByWebhookLogId(webhookLogId: string): Promise<N8nTextExchange | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('webhook_log_id', webhookLogId)
      .maybeSingle();

    if (error || !data) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(row: Record<string, unknown>): N8nTextExchange {
    return {
      id: row.id as string,
      webhookLogId: (row.webhook_log_id as string) ?? null,
      requestText: row.request_text as string,
      responseText: (row.response_text as string) ?? null,
      requestMetadata: (row.request_metadata as Record<string, unknown>) ?? {},
      responseMetadata: (row.response_metadata as Record<string, unknown>) ?? {},
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
