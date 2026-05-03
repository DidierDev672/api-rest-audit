"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientAssignmentsUseCase = exports.DeleteAssignmentUseCase = exports.GetAssignmentByIdUseCase = exports.GetAssignmentsByPatientUseCase = exports.CreateAssignmentUseCase = exports.CheckScreeningExistsUseCase = exports.CheckPatientExistsUseCase = exports.ValidateAssignmentUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class ValidateAssignmentUseCase {
    constructor(patientRepository, screeningRepository) {
        this.patientRepository = patientRepository;
        this.screeningRepository = screeningRepository;
    }
    async execute(patientId, screeningIds) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Validando asignación de tamizajes', { patientId, screeningIds });
            const patient = await this.patientRepository.findById(patientId);
            const patientExists = patient !== null;
            const screeningResults = await Promise.all(screeningIds.map(async (screeningId) => {
                IdValidator_1.IdValidator.validate(screeningId, 'Screening');
                const screening = await this.screeningRepository.findById(screeningId);
                return screening !== null;
            }));
            const missingScreeningIds = screeningIds.filter((_, index) => !screeningResults[index]);
            const result = {
                patientExists,
                screeningExists: screeningResults,
                missingScreeningIds,
            };
            Logger_1.Logger.success('Validación de asignación completada', {
                patientId,
                patientExists,
                missingCount: missingScreeningIds.length
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al validar asignación', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.ValidateAssignmentUseCase = ValidateAssignmentUseCase;
class CheckPatientExistsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Verificando existencia de paciente', { patientId });
            const patient = await this.repository.findById(patientId);
            const exists = patient !== null;
            Logger_1.Logger.success('Verificación de paciente completada', { patientId, exists });
            return exists;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al verificar paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CheckPatientExistsUseCase = CheckPatientExistsUseCase;
class CheckScreeningExistsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(screeningId) {
        try {
            IdValidator_1.IdValidator.validate(screeningId, 'Screening');
            Logger_1.Logger.info('Verificando existencia de tamizaje', { screeningId });
            const screening = await this.repository.findById(screeningId);
            const exists = screening !== null;
            Logger_1.Logger.success('Verificación de tamizaje completada', { screeningId, exists });
            return exists;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al verificar tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CheckScreeningExistsUseCase = CheckScreeningExistsUseCase;
class CreateAssignmentUseCase {
    constructor(assignmentRepository, patientRepository, screeningRepository) {
        this.assignmentRepository = assignmentRepository;
        this.patientRepository = patientRepository;
        this.screeningRepository = screeningRepository;
    }
    async execute(data) {
        try {
            IdValidator_1.IdValidator.validate(data.patientId, 'Patient');
            Logger_1.Logger.info('Creando asignación de tamizajes', {
                patientId: data.patientId,
                screeningCount: data.screeningIds.length
            });
            const patient = await this.patientRepository.findById(data.patientId);
            if (!patient) {
                throw new Error('El paciente no existe');
            }
            for (const screeningId of data.screeningIds) {
                IdValidator_1.IdValidator.validate(screeningId, 'Screening');
                const screening = await this.screeningRepository.findById(screeningId);
                if (!screening) {
                    throw new Error(`El tamizaje con ID ${screeningId} no existe`);
                }
            }
            const existingAssignments = await this.assignmentRepository.findByPatientId(data.patientId);
            if (existingAssignments.length > 0) {
                const existingScreeningIds = existingAssignments[0].screeningIds;
                const newScreeningIds = [...new Set([...existingScreeningIds, ...data.screeningIds])];
                const updated = await this.assignmentRepository.update(existingAssignments[0].id, {
                    screeningIds: newScreeningIds,
                });
                Logger_1.Logger.success('Asignación actualizada exitosamente', {
                    id: updated.id,
                    screeningCount: newScreeningIds.length
                });
                return updated;
            }
            const result = await this.assignmentRepository.create({
                patientId: data.patientId,
                screeningIds: data.screeningIds,
            });
            Logger_1.Logger.success('Asignación creada exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear asignación', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CreateAssignmentUseCase = CreateAssignmentUseCase;
class GetAssignmentsByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo asignaciones por paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Asignaciones obtenidas', { patientId, count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener asignaciones', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAssignmentsByPatientUseCase = GetAssignmentsByPatientUseCase;
class GetAssignmentByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Assignment');
            Logger_1.Logger.info('Obteniendo asignación por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Asignación no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Asignación obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener asignación', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAssignmentByIdUseCase = GetAssignmentByIdUseCase;
class DeleteAssignmentUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Assignment');
            Logger_1.Logger.info('Eliminando asignación', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Asignación eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar asignación', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteAssignmentUseCase = DeleteAssignmentUseCase;
class DeletePatientAssignmentsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Eliminando todas las asignaciones del paciente', { patientId });
            await this.repository.deleteByPatientId(patientId);
            Logger_1.Logger.success('Asignaciones del paciente eliminadas', { patientId });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar asignaciones del paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeletePatientAssignmentsUseCase = DeletePatientAssignmentsUseCase;
//# sourceMappingURL=PatientScreeningAssignmentUseCases.js.map