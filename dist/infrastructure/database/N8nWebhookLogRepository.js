"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nWebhookLogRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class N8nWebhookLogRepository {
    constructor() {
        this.table = 'n8n_webhook_logs';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
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
    mapToEntity(row) {
        return {
            id: row.id,
            httpMethod: row.http_method,
            endpoint: row.endpoint,
            direction: row.direction,
            payloadType: row.payload_type,
            status: row.status,
            requestPayload: row.request_payload ?? {},
            responsePayload: row.response_payload ?? null,
            errorMessage: row.error_message ?? null,
            durationMs: row.duration_ms !== null && row.duration_ms !== undefined
                ? Number(row.duration_ms)
                : null,
            createdAt: new Date(row.created_at),
        };
    }
}
exports.N8nWebhookLogRepository = N8nWebhookLogRepository;
//# sourceMappingURL=N8nWebhookLogRepository.js.map