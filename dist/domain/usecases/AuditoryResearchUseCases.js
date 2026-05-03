"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAuditoryResearchUseCase = exports.UpdateAuditoryResearchUseCase = exports.GetAuditoryResearchByIdUseCase = exports.GetAllAuditoryResearchUseCase = exports.CreateAuditoryResearchUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateAuditoryResearchUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando investigación auditiva', { name: data.name });
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Investigación auditiva creada exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear investigación auditiva', { error: error.message });
            throw error;
        }
    }
}
exports.CreateAuditoryResearchUseCase = CreateAuditoryResearchUseCase;
class GetAllAuditoryResearchUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todas las investigaciones auditivas');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Investigaciones auditivas obtenidas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener investigaciones auditivas', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllAuditoryResearchUseCase = GetAllAuditoryResearchUseCase;
class GetAuditoryResearchByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'AuditoryResearch');
            Logger_1.Logger.info('Obteniendo investigación auditiva por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Investigación auditiva no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Investigación auditiva obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener investigación auditiva por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetAuditoryResearchByIdUseCase = GetAuditoryResearchByIdUseCase;
class UpdateAuditoryResearchUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'AuditoryResearch');
            Logger_1.Logger.info('Actualizando investigación auditiva', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Investigación auditiva actualizada', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar investigación auditiva', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateAuditoryResearchUseCase = UpdateAuditoryResearchUseCase;
class DeleteAuditoryResearchUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'AuditoryResearch');
            Logger_1.Logger.info('Eliminando investigación auditiva', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Investigación auditiva eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar investigación auditiva', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteAuditoryResearchUseCase = DeleteAuditoryResearchUseCase;
//# sourceMappingURL=AuditoryResearchUseCases.js.map