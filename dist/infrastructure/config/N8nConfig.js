"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nConfigProvider = void 0;
class N8nConfigProvider {
    static load() {
        const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();
        if (!webhookUrl) {
            throw new Error('N8N_WEBHOOK_URL no está configurada. Defina la URL del webhook de N8N en las variables de entorno.');
        }
        const timeout = Number(process.env.N8N_REQUEST_TIMEOUT_MS ?? 30000);
        return {
            webhookUrl,
            webhookSecret: process.env.N8N_WEBHOOK_SECRET?.trim() || undefined,
            requestTimeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 30000,
        };
    }
}
exports.N8nConfigProvider = N8nConfigProvider;
//# sourceMappingURL=N8nConfig.js.map