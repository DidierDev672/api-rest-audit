"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScreeningUseCase = exports.UpdateScreeningUseCase = exports.GetScreeningByIdUseCase = exports.GetAllScreeningsUseCase = exports.CreateScreeningUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateScreeningUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info("Creando tamizaje", { title: data.title });
            const result = await this.repository.create(data);
            Logger_1.Logger.success("Tamizaje creado exitosamente", { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger("Error al crear tamizaje", {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CreateScreeningUseCase = CreateScreeningUseCase;
class GetAllScreeningsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info("Obteniendo todos los tamizajes");
            const result = await this.repository.findAll();
            Logger_1.Logger.success("Tamizajes obtenidos", { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger("Error al obtener tamizajes", {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllScreeningsUseCase = GetAllScreeningsUseCase;
class GetScreeningByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, "screening");
            Logger_1.Logger.info("Obteniendo tamizaje por ID", { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning("Tamizaje no encontrado", { id });
                return null;
            }
            Logger_1.Logger.success("Tamizaje obtenido", { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger("Error al obtener tamizaje por ID", {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetScreeningByIdUseCase = GetScreeningByIdUseCase;
class UpdateScreeningUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, "Screening");
            Logger_1.Logger.info("Actualizando tamizaje", { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success("Tamizaje actualizado", { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger("Error al actualizar tamizaje", {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.UpdateScreeningUseCase = UpdateScreeningUseCase;
class DeleteScreeningUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, "Screening");
            Logger_1.Logger.info("Eliminando tamizaje", { id });
            await this.repository.delete(id);
            Logger_1.Logger.success("Tamizaje eliminado", { id });
        }
        catch (error) {
            Logger_1.Logger.danger("Error al eliminar tamizaje", {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteScreeningUseCase = DeleteScreeningUseCase;
//# sourceMappingURL=ScreeningUseCases.js.map