"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.ScreeningRepository();
function toSnakeCase(screening) {
    return {
        id: screening.id,
        title: screening.title,
        description: screening.description,
        sound: screening.sound,
        options_answer: screening.optionsAnswer?.map(opt => ({
            id: opt.id,
            text: opt.text,
            value: typeof opt.value === 'number' ? opt.value : opt.value ? 1 : 0
        })) || [],
        created_at: screening.createdAt,
        updated_at: screening.updatedAt
    };
}
class ScreeningController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateScreeningSchema.parse(req.body);
            const useCase = new usecases_1.CreateScreeningUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(toSnakeCase(result));
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en ScreeningController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllScreeningsUseCase(repository);
            const result = await useCase.execute();
            res.json(result.map(toSnakeCase));
        }
        catch (error) {
            Logger_1.Logger.danger('Error en ScreeningController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetScreeningByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Tamizaje no encontrado' });
                return;
            }
            res.json(toSnakeCase(result));
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en ScreeningController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateScreeningSchema.parse(req.body);
            const useCase = new usecases_1.UpdateScreeningUseCase(repository);
            const result = await useCase.execute(id, data);
            res.json(toSnakeCase(result));
        }
        catch (error) {
            const errorMessage = error.message;
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en ScreeningController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteScreeningUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en ScreeningController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.ScreeningController = ScreeningController;
//# sourceMappingURL=ScreeningController.js.map