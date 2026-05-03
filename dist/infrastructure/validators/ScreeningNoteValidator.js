"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningNoteValidator = exports.EntityNotFoundError = exports.ConflictError = exports.NotFoundError = exports.ValidationError = void 0;
const Logger_1 = require("../logger/Logger");
const IdValidator_1 = require("./IdValidator");
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
class EntityNotFoundError extends Error {
    constructor(entityName, id) {
        super(`${entityName} con ID ${id} no encontrado`);
        this.name = 'EntityNotFoundError';
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class ScreeningNoteValidator {
    static validateId(id, entityName) {
        IdValidator_1.IdValidator.validate(id, entityName);
    }
    static async validatePatientExists(patientId, patientRepository) {
        try {
            Logger_1.Logger.info(`Validando existencia de paciente`, { id: patientId });
            const patient = await patientRepository.findById(patientId);
            if (!patient) {
                Logger_1.Logger.warning(`Paciente no encontrado`, { id: patientId });
                return false;
            }
            Logger_1.Logger.success(`Paciente validado`, { id: patientId });
            return true;
        }
        catch (error) {
            Logger_1.Logger.danger(`Error al validar paciente`, { id: patientId, error: error.message });
            throw error;
        }
    }
    static async validateScreeningExists(screeningId, screeningRepository) {
        try {
            Logger_1.Logger.info(`Validando existencia de tamizaje`, { id: screeningId });
            const screening = await screeningRepository.findById(screeningId);
            if (!screening) {
                Logger_1.Logger.warning(`Tamizaje no encontrado`, { id: screeningId });
                return false;
            }
            Logger_1.Logger.success(`Tamizaje validado`, { id: screeningId });
            return true;
        }
        catch (error) {
            Logger_1.Logger.danger(`Error al validar tamizaje`, { id: screeningId, error: error.message });
            throw error;
        }
    }
    static async validatePatientAndScreening(patientId, screeningId, patientRepository, screeningRepository) {
        try {
            Logger_1.Logger.info(`Validando paciente y tamizaje`, { patientId, screeningId });
            const [patientExists, screeningExists] = await Promise.all([
                this.validatePatientExists(patientId, patientRepository),
                this.validateScreeningExists(screeningId, screeningRepository),
            ]);
            if (!patientExists) {
                throw new NotFoundError(`Paciente con ID ${patientId} no encontrado`);
            }
            if (!screeningExists) {
                throw new NotFoundError(`Tamizaje con ID ${screeningId} no encontrado`);
            }
            Logger_1.Logger.success(`Validación completada`, { patientExists, screeningExists });
            return { patientExists, screeningExists };
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            Logger_1.Logger.danger(`Error en validación`, { error: error.message });
            throw error;
        }
    }
}
exports.ScreeningNoteValidator = ScreeningNoteValidator;
//# sourceMappingURL=ScreeningNoteValidator.js.map