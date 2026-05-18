"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextContentValidator = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class TextContentValidator {
    static validateNonEmpty(value, fieldName) {
        if (value === null || value === undefined) {
            throw new ValidationError_1.ValidationError(`${fieldName} no puede ser nulo`);
        }
        const trimmed = value.trim();
        if (trimmed.length === 0) {
            throw new ValidationError_1.ValidationError(`${fieldName} no puede estar vacío`);
        }
        return trimmed;
    }
}
exports.TextContentValidator = TextContentValidator;
//# sourceMappingURL=TextContentValidator.js.map