import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import {
  CreateN8nWebhookLogInput,
  IN8nWebhookLogRepository,
} from '../../domain/repositories/IN8nWebhookLogRepository';
import { N8nWebhookLog } from '../../domain/entities/N8nIntegration';

export class N8nWebhookLogRepository implements IN8nWebhookLogRepository {
  private readonly table = 'n8n_webhook_logs';

  async create(data: CreateN8nWebhookLogInput): Promise<N8nWebhookLog> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        http_method: data.httpMethod ?? 'POST',
        endpoint: data.endpoint,
        direction: data.direction,
        payload_type: data.payloadType,
        status: data.status,
        request_payload: data.requestPayload,
        response_payload: data.responsePayload ?? null,
        error_message: data.errorMessage ?? null,
        duration_ms: data.durationMs ?? null,
        created_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findById(id: string): Promise<N8nWebhookLog | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(row: Record<string, unknown>): N8nWebhookLog {
    return {
      id: row.id as string,
      httpMethod: row.http_method as string,
      endpoint: row.endpoint as N8nWebhookLog['endpoint'],
      direction: row.direction as N8nWebhookLog['direction'],
      payloadType: row.payload_type as N8nWebhookLog['payloadType'],
      status: row.status as N8nWebhookLog['status'],
      requestPayload: (row.request_payload as Record<string, unknown>) ?? {},
      responsePayload: (row.response_payload as Record<string, unknown>) ?? null,
      errorMessage: (row.error_message as string) ?? null,
      durationMs:
        row.duration_ms !== null && row.duration_ms !== undefined
          ? Number(row.duration_ms)
          : null,
      createdAt: new Date(row.created_at as string),
    };
  }
}
