"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTinnitusResponseUseCase = exports.UpdateTinnitusResponseUseCase = exports.GetTinnitusResponsesByQuestionnaireIdUseCase = exports.GetTinnitusResponsesByPatientIdUseCase = exports.GetTinnitusResponseByIdUseCase = exports.GetAllTinnitusResponsesUseCase = exports.CreateTinnitusResponseUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateTinnitusResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando respuesta de cuestionario de tinnitus', {
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires
            });
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Respuesta de cuestionario de tinnitus creada exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear respuesta de cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.CreateTinnitusResponseUseCase = CreateTinnitusResponseUseCase;
class GetAllTinnitusResponsesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todas las respuestas de cuestionarios de tinnitus');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Respuestas de cuestionarios de tinnitus obtenidas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener respuestas de cuestionarios de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllTinnitusResponsesUseCase = GetAllTinnitusResponsesUseCase;
class GetTinnitusResponseByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusResponse');
            Logger_1.Logger.info('Obteniendo respuesta de cuestionario de tinnitus por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Respuesta de cuestionario de tinnitus no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Respuesta de cuestionario de tinnitus obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener respuesta de cuestionario de tinnitus por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetTinnitusResponseByIdUseCase = GetTinnitusResponseByIdUseCase;
class GetTinnitusResponsesByPatientIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo respuestas de cuestionarios de tinnitus por ID de paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Respuestas de cuestionarios de tinnitus obtenidas por paciente', { patientId, count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener respuestas de cuestionarios de tinnitus por paciente', { error: error.message });
            throw error;
        }
    }
}
exports.GetTinnitusResponsesByPatientIdUseCase = GetTinnitusResponsesByPatientIdUseCase;
class GetTinnitusResponsesByQuestionnaireIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(questionnaireId) {
        try {
            IdValidator_1.IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Obteniendo respuestas de cuestionarios de tinnitus por ID de cuestionario', { questionnaireId });
            const result = await this.repository.findByQuestionnaireId(questionnaireId);
            Logger_1.Logger.success('Respuestas de cuestionarios de tinnitus obtenidas por cuestionario', { questionnaireId, count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener respuestas de cuestionarios por cuestionario', { error: error.message });
            throw error;
        }
    }
}
exports.GetTinnitusResponsesByQuestionnaireIdUseCase = GetTinnitusResponsesByQuestionnaireIdUseCase;
class UpdateTinnitusResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusResponse');
            Logger_1.Logger.info('Actualizando respuesta de cuestionario de tinnitus', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Respuesta de cuestionario de tinnitus actualizada', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar respuesta de cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateTinnitusResponseUseCase = UpdateTinnitusResponseUseCase;
class DeleteTinnitusResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusResponse');
            Logger_1.Logger.info('Eliminando respuesta de cuestionario de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Respuesta de cuestionario de tinnitus eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar respuesta de cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteTinnitusResponseUseCase = DeleteTinnitusResponseUseCase;
//# sourceMappingURL=TinnitusResponseUseCases.js.map