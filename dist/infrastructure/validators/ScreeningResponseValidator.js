"use strict";
/**
 * Validator for Screening Response
 * Validates the required fields for storing tamizaje responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningResponseValidator = void 0;
class ScreeningResponseValidator {
    /**
     * Validate required fields: id_patient, id_screening, options_answer
     */
    static validate(data) {
        const errors = [];
        // Validate id_patient (required, UUID format)
        if (!data.id_patient) {
            errors.push('El campo id_patient es requerido');
        }
        else if (!this.isValidUUID(data.id_patient)) {
            errors.push('El campo id_patient debe ser un UUID válido');
        }
        // Validate id_screening (required, UUID format)
        if (!data.id_screening) {
            errors.push('El campo id_screening es requerido');
        }
        else if (!this.isValidUUID(data.id_screening)) {
            errors.push('El campo id_screening debe ser un UUID válido');
        }
        // Validate options_answer (required, array with objects having id, text, value)
        if (!data.options_answer) {
            errors.push('El campo options_answer es requerido');
        }
        else if (!Array.isArray(data.options_answer)) {
            errors.push('El campo options_answer debe ser un arreglo');
        }
        else if (data.options_answer.length === 0) {
            errors.push('El campo options_answer no puede estar vacío');
        }
        else {
            // Validate each option in the array
            data.options_answer.forEach((option, index) => {
                if (!option.id) {
                    errors.push(`options_answer[${index}].id es requerido`);
                }
                if (!option.text) {
                    errors.push(`options_answer[${index}].text es requerido`);
                }
                if (option.value === undefined || option.value === null) {
                    errors.push(`options_answer[${index}].value es requerido`);
                }
                else if (typeof option.value !== 'number') {
                    errors.push(`options_answer[${index}].value debe ser un número`);
                }
            });
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    /**
     * Validate UUID format (simple validation)
     */
    static isValidUUID(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }
    /**
     * Validate partial update (all fields optional)
     */
    static validatePartial(data) {
        const errors = [];
        // If id_patient is provided, validate it
        if (data.id_patient !== undefined) {
            if (!data.id_patient) {
                errors.push('id_patient no puede estar vacío');
            }
            else if (!this.isValidUUID(data.id_patient)) {
                errors.push('id_patient debe ser un UUID válido');
            }
        }
        // If id_screening is provided, validate it
        if (data.id_screening !== undefined) {
            if (!data.id_screening) {
                errors.push('id_screening no puede estar vacío');
            }
            else if (!this.isValidUUID(data.id_screening)) {
                errors.push('id_screening debe ser un UUID válido');
            }
        }
        // If options_answer is provided, validate it
        if (data.options_answer !== undefined) {
            if (!Array.isArray(data.options_answer)) {
                errors.push('options_answer debe ser un arreglo');
            }
            else if (data.options_answer.length === 0) {
                errors.push('options_answer no puede estar vacío');
            }
            else {
                data.options_answer.forEach((option, index) => {
                    if (option.id !== undefined && !option.id) {
                        errors.push(`options_answer[${index}].id no puede estar vacío`);
                    }
                    if (option.text !== undefined && !option.text) {
                        errors.push(`options_answer[${index}].text no puede estar vacío`);
                    }
                    if (option.value !== undefined && option.value !== null && typeof option.value !== 'number') {
                        errors.push(`options_answer[${index}].value debe ser un número`);
                    }
                });
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
exports.ScreeningResponseValidator = ScreeningResponseValidator;
//# sourceMappingURL=ScreeningResponseValidator.js.map