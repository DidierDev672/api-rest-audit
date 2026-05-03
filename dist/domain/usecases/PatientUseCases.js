"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientUseCase = exports.UpdatePatientUseCase = exports.GetPatientByIdUseCase = exports.GetAllPatientsUseCase = exports.CreatePatientUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
class CreatePatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando paciente', { fullName: data.fullName });
            if (!data.hasConsent) {
                throw new errorHandler_1.AppError('El consentimiento es mandatorio para la permanencia de la integridad digital', 403);
            }
            const existingPatient = await this.repository.findByDocumentNumber(data.documentNumber);
            if (existingPatient) {
                throw new errorHandler_1.AppError('Ya existe un paciente con este número de documento', 409);
            }
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Paciente creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            Logger_1.Logger.danger('Error al crear paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CreatePatientUseCase = CreatePatientUseCase;
class GetAllPatientsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los pacientes');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Pacientes obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener pacientes', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllPatientsUseCase = GetAllPatientsUseCase;
class GetPatientByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Patient');
            Logger_1.Logger.info('Obteniendo paciente por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Paciente no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Paciente obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener paciente por ID', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetPatientByIdUseCase = GetPatientByIdUseCase;
class UpdatePatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Patient');
            Logger_1.Logger.info('Actualizando paciente', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Paciente actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.UpdatePatientUseCase = UpdatePatientUseCase;
class DeletePatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Patient');
            Logger_1.Logger.info('Eliminando paciente', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Paciente eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeletePatientUseCase = DeletePatientUseCase;
//# sourceMappingURL=PatientUseCases.js.map