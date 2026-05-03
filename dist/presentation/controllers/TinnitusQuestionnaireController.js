"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusQuestionnaireController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.TinnitusQuestionnaireRepository();
class TinnitusQuestionnaireController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateTinnitusQuestionnaireDTO.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusQuestionnaireUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusQuestionnaireController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllTinnitusQuestionnairesUseCase(repository);
            const result = await useCase.execute();
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en TinnitusQuestionnaireController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetTinnitusQuestionnaireByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Cuestionario no encontrado' });
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
            Logger_1.Logger.danger('Error en TinnitusQuestionnaireController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateTinnitusQuestionnaireDTO.parse(req.body);
            const useCase = new usecases_1.UpdateTinnitusQuestionnaireUseCase(repository);
            const result = await useCase.execute(id, data);
            res.json(result);
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
            Logger_1.Logger.danger('Error en TinnitusQuestionnaireController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteTinnitusQuestionnaireUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusQuestionnaireController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.TinnitusQuestionnaireController = TinnitusQuestionnaireController;
//# sourceMappingURL=TinnitusQuestionnaireController.js.map