"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nTextExchangeRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class N8nTextExchangeRepository {
    constructor() {
        this.table = 'n8n_text_exchanges';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
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
            requestText: row.request_text,
            responseText: row.response_text ?? null,
            requestMetadata: row.request_metadata ?? {},
            responseMetadata: row.response_metadata ?? {},
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
        };
    }
}
exports.N8nTextExchangeRepository = N8nTextExchangeRepository;
//# sourceMappingURL=N8nTextExchangeRepository.js.map