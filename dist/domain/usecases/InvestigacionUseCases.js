"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInvestigacionByIdUseCase = exports.GetAllInvestigacionesUseCase = exports.CreateInvestigacionUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateInvestigacionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando investigación', { id_resource: data.id_resource });
            if (!data.id_resource || data.id_resource.trim() === '') {
                throw new Error('id_resource es requerido y no puede estar vacío');
            }
            if (!data.content_resource || data.content_resource.trim() === '') {
                throw new Error('content_resource es requerido y no puede estar vacío');
            }
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Investigación creada exitosamente', { id_resource: result.id_resource });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear investigación', { error: error.message });
            throw error;
        }
    }
}
exports.CreateInvestigacionUseCase = CreateInvestigacionUseCase;
class GetAllInvestigacionesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todas las investigaciones');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Investigaciones obtenidas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener investigaciones', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllInvestigacionesUseCase = GetAllInvestigacionesUseCase;
class GetInvestigacionByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'Investigacion');
            Logger_1.Logger.info('Obteniendo investigación por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Investigación no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Investigación obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener investigación por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetInvestigacionByIdUseCase = GetInvestigacionByIdUseCase;
//# sourceMappingURL=InvestigacionUseCases.js.map