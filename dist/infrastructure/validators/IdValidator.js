"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = exports.IdValidator = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const errorHandler_1 = require("../middleware/errorHandler");
const zod_1 = require("zod");
class IdValidator {
    static validate(id, entityName) {
        if (!id || id.trim() === '') {
            Logger_1.Logger.warning(`ID requerido para ${entityName}`, { id });
            throw new errorHandler_1.AppError(`El ID de ${entityName} es requerido`, 400);
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id.trim())) {
            Logger_1.Logger.warning(`ID inválido para ${entityName}`, { id });
            throw new errorHandler_1.AppError(`El ID proporcionado para ${entityName} no es válido`, 400);
        }
    }
    static validateOptional(id, entityName) {
        if (id && id.trim() !== '') {
            this.validate(id, entityName);
        }
    }
}
exports.IdValidator = IdValidator;
class RequestValidator {
    static validateDTO(schema, data, entityName) {
        try {
            schema.parse(data);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning(`Validación fallida para ${entityName}`, { errors: error.errors });
                throw new errorHandler_1.AppError(`Datos inválidos para ${entityName}: ${JSON.stringify(error.errors)}`, 400);
            }
            throw error;
        }
    }
}
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=IdValidator.js.map