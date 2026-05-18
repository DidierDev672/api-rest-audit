"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nMarkdownDocumentRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class N8nMarkdownDocumentRepository {
    constructor() {
        this.table = 'n8n_markdown_documents';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
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
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findById(id) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    async findByWebhookLogId(webhookLogId) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('webhook_log_id', webhookLogId)
            .maybeSingle();
        if (error || !data)
            return null;
        return this.mapToEntity(data);
    }
    mapToEntity(row) {
        return {
            id: row.id,
            webhookLogId: row.webhook_log_id ?? null,
            filename: row.filename,
            content: row.content,
            contentLength: Number(row.content_length),
            storagePath: row.storage_path ?? null,
            sourceType: row.source_type,
            task: row.task ?? null,
            sourceTimestamp: row.source_timestamp
                ? new Date(row.source_timestamp)
                : null,
            geminiFinishReason: row.gemini_finish_reason ?? null,
            geminiRole: row.gemini_role ?? null,
            geminiRawResponse: row.gemini_raw_response ?? null,
            metadata: row.metadata ?? {},
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
        };
    }
}
exports.N8nMarkdownDocumentRepository = N8nMarkdownDocumentRepository;
//# sourceMappingURL=N8nMarkdownDocumentRepository.js.map