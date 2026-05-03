"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTinnitusQuestionnaireUseCase = exports.UpdateTinnitusQuestionnaireUseCase = exports.GetTinnitusQuestionnaireByIdUseCase = exports.GetAllTinnitusQuestionnairesUseCase = exports.CreateTinnitusQuestionnaireUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateTinnitusQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando cuestionario de tinnitus', { title: data.title });
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Cuestionario de tinnitus creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.CreateTinnitusQuestionnaireUseCase = CreateTinnitusQuestionnaireUseCase;
class GetAllTinnitusQuestionnairesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los cuestionarios de tinnitus');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Cuestionarios de tinnitus obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener cuestionarios de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllTinnitusQuestionnairesUseCase = GetAllTinnitusQuestionnairesUseCase;
class GetTinnitusQuestionnaireByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Obteniendo cuestionario de tinnitus por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Cuestionario de tinnitus no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Cuestionario de tinnitus obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener cuestionario de tinnitus por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetTinnitusQuestionnaireByIdUseCase = GetTinnitusQuestionnaireByIdUseCase;
class UpdateTinnitusQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Actualizando cuestionario de tinnitus', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Cuestionario de tinnitus actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateTinnitusQuestionnaireUseCase = UpdateTinnitusQuestionnaireUseCase;
class DeleteTinnitusQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Eliminando cuestionario de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Cuestionario de tinnitus eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar cuestionario de tinnitus', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteTinnitusQuestionnaireUseCase = DeleteTinnitusQuestionnaireUseCase;
//# sourceMappingURL=TinnitusQuestionnaireUseCases.js.map