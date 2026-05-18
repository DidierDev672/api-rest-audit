import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import {
  CreateN8nMarkdownDocumentInput,
  IN8nMarkdownDocumentRepository,
} from '../../domain/repositories/IN8nMarkdownDocumentRepository';
import { N8nMarkdownDocument } from '../../domain/entities/N8nIntegration';

export class N8nMarkdownDocumentRepository implements IN8nMarkdownDocumentRepository {
  private readonly table = 'n8n_markdown_documents';

  async create(data: CreateN8nMarkdownDocumentInput): Promise<N8nMarkdownDocument> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        webhook_log_id: data.webhookLogId ?? null,
        filename: data.filename,
        content: data.content,
        content_length: data.contentLength,
        storage_path: data.storagePath ?? null,
        source_type: data.sourceType,
        task: data.task ?? null,
        source_timestamp: data.sourceTimestamp?.toISOString() ?? null,
        gemini_finish_reason: data.geminiFinishReason ?? null,
        gemini_role: data.geminiRole ?? null,
        gemini_raw_response: data.geminiRawResponse ?? null,
        metadata: data.metadata ?? {},
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findById(id: string): Promise<N8nMarkdownDocument | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByWebhookLogId(webhookLogId: string): Promise<N8nMarkdownDocument | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('webhook_log_id', webhookLogId)
      .maybeSingle();

    if (error || !data) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(row: Record<string, unknown>): N8nMarkdownDocument {
    return {
      id: row.id as string,
      webhookLogId: (row.webhook_log_id as string) ?? null,
      filename: row.filename as string,
      content: row.content as string,
      contentLength: Number(row.content_length),
      storagePath: (row.storage_path as string) ?? null,
      sourceType: row.source_type as N8nMarkdownDocument['sourceType'],
      task: (row.task as string) ?? null,
      sourceTimestamp: row.source_timestamp
        ? new Date(row.source_timestamp as string)
        : null,
      geminiFinishReason: (row.gemini_finish_reason as string) ?? null,
      geminiRole: (row.gemini_role as string) ?? null,
      geminiRawResponse:
        (row.gemini_raw_response as Record<string, unknown>) ?? null,
      metadata: (row.metadata as Record<string, unknown>) ?? {},
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
