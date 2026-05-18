"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nIntegrationError = void 0;
class N8nIntegrationError extends Error {
    constructor(message, statusCode = 502) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'N8nIntegrationError';
    }
}
exports.N8nIntegrationError = N8nIntegrationError;
//# sourceMappingURL=N8nIntegrationError.js.map