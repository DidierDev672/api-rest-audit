"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientTinnitusAssignmentsUseCase = exports.DeleteTinnitusAssignmentUseCase = exports.GetTinnitusAssignmentByIdUseCase = exports.GetTinnitusAssignmentsByPatientUseCase = exports.CreateTinnitusAssignmentUseCase = exports.CheckTinnitusExistsUseCase = exports.CheckPatientTinnitusExistsUseCase = exports.ValidateTinnitusAssignmentUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class ValidateTinnitusAssignmentUseCase {
    constructor(patientRepository, tinnitusRepository) {
        this.patientRepository = patientRepository;
        this.tinnitusRepository = tinnitusRepository;
    }
    async execute(idPatient, idTinnitusQuestionnaires) {
        try {
            IdValidator_1.IdValidator.validate(idPatient, 'Patient');
            IdValidator_1.IdValidator.validate(idTinnitusQuestionnaires, 'Tinnitus');
            Logger_1.Logger.info('Validando asignación de cuestionario tinnitus', { idPatient, idTinnitusQuestionnaires });
            const patient = await this.patientRepository.findById(idPatient);
            const patientExists = patient !== null;
            const tinnitus = await this.tinnitusRepository.findById(idTinnitusQuestionnaires);
            const tinnitusExists = tinnitus !== null;
            const result = {
                patientExists,
                tinnitusExists,
                patientMissing: !patientExists,
                tinnitusMissing: !tinnitusExists,
            };
            Logger_1.Logger.success('Validación de asignación completada', {
                idPatient,
                idTinnitusQuestionnaires,
                patientExists,
                tinnitusExists,
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
exports.ValidateTinnitusAssignmentUseCase = ValidateTinnitusAssignmentUseCase;
class CheckPatientTinnitusExistsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(idPatient) {
        try {
            IdValidator_1.IdValidator.validate(idPatient, 'Patient');
            Logger_1.Logger.info('Verificando existencia de paciente', { idPatient });
            const patient = await this.repository.findById(idPatient);
            const exists = patient !== null;
            Logger_1.Logger.success('Verificación de paciente completada', { idPatient, exists });
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
exports.CheckPatientTinnitusExistsUseCase = CheckPatientTinnitusExistsUseCase;
class CheckTinnitusExistsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(idTinnitusQuestionnaires) {
        try {
            IdValidator_1.IdValidator.validate(idTinnitusQuestionnaires, 'Tinnitus');
            Logger_1.Logger.info('Verificando existencia de cuestionario tinnitus', { idTinnitusQuestionnaires });
            const tinnitus = await this.repository.findById(idTinnitusQuestionnaires);
            const exists = tinnitus !== null;
            Logger_1.Logger.success('Verificación de cuestionario tinnitus completada', { idTinnitusQuestionnaires, exists });
            return exists;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al verificar cuestionario tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CheckTinnitusExistsUseCase = CheckTinnitusExistsUseCase;
class CreateTinnitusAssignmentUseCase {
    constructor(assignmentRepository, patientRepository, tinnitusRepository) {
        this.assignmentRepository = assignmentRepository;
        this.patientRepository = patientRepository;
        this.tinnitusRepository = tinnitusRepository;
    }
    async execute(data) {
        try {
            IdValidator_1.IdValidator.validate(data.idPatient, 'Patient');
            IdValidator_1.IdValidator.validate(data.idTinnitusQuestionnaires, 'Tinnitus');
            Logger_1.Logger.info('Creando asignación de cuestionario tinnitus', {
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
            });
            const patient = await this.patientRepository.findById(data.idPatient);
            if (!patient) {
                throw new Error('El paciente no existe');
            }
            const tinnitus = await this.tinnitusRepository.findById(data.idTinnitusQuestionnaires);
            if (!tinnitus) {
                throw new Error('El cuestionario de tinnitus no existe');
            }
            const result = await this.assignmentRepository.create({
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
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
exports.CreateTinnitusAssignmentUseCase = CreateTinnitusAssignmentUseCase;
class GetTinnitusAssignmentsByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(idPatient) {
        try {
            IdValidator_1.IdValidator.validate(idPatient, 'Patients');
            Logger_1.Logger.info('Obteniendo asignaciones de tinnitus por paciente', { idPatient });
            const result = await this.repository.findByPatientId(idPatient);
            if (result === null) {
                Logger_1.Logger.warning('No se encontraron asignaciones para el paciente', { idPatient });
                return [];
            }
            Logger_1.Logger.success('Asignaciones obtenidas', { idPatient, count: result.length });
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
exports.GetTinnitusAssignmentsByPatientUseCase = GetTinnitusAssignmentsByPatientUseCase;
class GetTinnitusAssignmentByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusAssignment');
            Logger_1.Logger.info('Obteniendo asignación de tinnitus por ID', { id });
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
exports.GetTinnitusAssignmentByIdUseCase = GetTinnitusAssignmentByIdUseCase;
class DeleteTinnitusAssignmentUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusAssignment');
            Logger_1.Logger.info('Eliminando asignación de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Asignación de tinnitus eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar asignación', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteTinnitusAssignmentUseCase = DeleteTinnitusAssignmentUseCase;
class DeletePatientTinnitusAssignmentsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(idPatient) {
        try {
            IdValidator_1.IdValidator.validate(idPatient, 'Patient');
            Logger_1.Logger.info('Eliminando todas las asignaciones de tinnitus del paciente', { idPatient });
            await this.repository.deleteByPatientId(idPatient);
            Logger_1.Logger.success('Asignaciones del paciente eliminadas', { idPatient });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar asignaciones del paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeletePatientTinnitusAssignmentsUseCase = DeletePatientTinnitusAssignmentsUseCase;
//# sourceMappingURL=PatientTinnitusAssignmentUseCases.js.map