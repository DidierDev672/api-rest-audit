"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRelaxingSoundUseCase = exports.UpdateRelaxingSoundUseCase = exports.GetRelaxingSoundByIdUseCase = exports.GetAllRelaxingSoundsUseCase = exports.CreateRelaxingSoundUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateRelaxingSoundUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando sonido relajante', { title: data.title });
            const result = await this.repository.create(data);
            Logger_1.Logger.success('Sonido relajante creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear sonido relajante', { error: error.message });
            throw error;
        }
    }
}
exports.CreateRelaxingSoundUseCase = CreateRelaxingSoundUseCase;
class GetAllRelaxingSoundsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los sonidos relajantes');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Sonidos relajantes obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener sonidos relajantes', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllRelaxingSoundsUseCase = GetAllRelaxingSoundsUseCase;
class GetRelaxingSoundByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'RelaxingSound');
            Logger_1.Logger.info('Obteniendo sonido relajante por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Sonido relajante no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Sonido relajante obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener sonido relajante por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetRelaxingSoundByIdUseCase = GetRelaxingSoundByIdUseCase;
class UpdateRelaxingSoundUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'RelaxingSound');
            Logger_1.Logger.info('Actualizando sonido relajante', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Sonido relajante actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar sonido relajante', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateRelaxingSoundUseCase = UpdateRelaxingSoundUseCase;
class DeleteRelaxingSoundUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'RelaxingSound');
            Logger_1.Logger.info('Eliminando sonido relajante', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Sonido relajante eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar sonido relajante', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteRelaxingSoundUseCase = DeleteRelaxingSoundUseCase;
//# sourceMappingURL=RelaxingSoundUseCases.js.map