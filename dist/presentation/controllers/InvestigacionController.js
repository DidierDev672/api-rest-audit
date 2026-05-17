"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigacionController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.InvestigacionRepository();
class InvestigacionController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateInvestigacionDTO.parse(req.body);
            const useCase = new usecases_1.CreateInvestigacionUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en InvestigacionController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllInvestigacionesUseCase(repository);
            const result = await useCase.execute();
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en InvestigacionController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async listByIdResource(req, res) {
        try {
            const { id_resource } = req.params;
            const useCase = new usecases_1.GetInvestigacionByIdUseCase(repository);
            const result = await useCase.execute(id_resource);
            if (!result) {
                res.status(404).json({ error: 'Investigación no encontrada' });
                return;
            }
            res.json([result]);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en InvestigacionController.listByIdResource', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetInvestigacionByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Investigación no encontrada' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en InvestigacionController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateInvestigacionDTO.parse(req.body);
            const useCase = new usecases_1.UpdateInvestigacionUseCase(repository);
            const result = await useCase.execute(id, data);
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en InvestigacionController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteInvestigacionUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en InvestigacionController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.InvestigacionController = InvestigacionController;
//# sourceMappingURL=InvestigacionController.js.map