"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
const Logger_1 = require("../logger/Logger");
const DEFAULT_OPTIONS = {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
};
async function withRetry(fn, options = {}) {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let lastError;
    let delay = opts.initialDelay;
    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            Logger_1.Logger.warning(`Intento ${attempt}/${opts.maxAttempts} falló`, {
                error: lastError.message,
                nextRetryDelay: delay,
            });
            if (attempt < opts.maxAttempts) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay = Math.min(delay * opts.backoffMultiplier, opts.maxDelay);
            }
        }
    }
    Logger_1.Logger.danger(`Todos los ${opts.maxAttempts} intentos fallaron`, {
        error: lastError?.message,
    });
    throw lastError;
}
//# sourceMappingURL=RetryLogic.js.map