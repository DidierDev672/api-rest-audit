"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusResponseController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.TinnitusResponseRepository();
class TinnitusResponseController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateTinnitusResponseDTO.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusResponseUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusResponseController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllTinnitusResponsesUseCase(repository);
            const result = await useCase.execute();
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en TinnitusResponseController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetTinnitusResponseByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Respuesta de cuestionario no encontrada' });
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
            Logger_1.Logger.danger('Error en TinnitusResponseController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findByPatientId(req, res) {
        try {
            const { patientId } = req.params;
            const useCase = new usecases_1.GetTinnitusResponsesByPatientIdUseCase(repository);
            const result = await useCase.execute(patientId);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusResponseController.findByPatientId', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findByQuestionnaireId(req, res) {
        try {
            const { questionnaireId } = req.params;
            const useCase = new usecases_1.GetTinnitusResponsesByQuestionnaireIdUseCase(repository);
            const result = await useCase.execute(questionnaireId);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusResponseController.findByQuestionnaireId', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateTinnitusResponseDTO.parse(req.body);
            const useCase = new usecases_1.UpdateTinnitusResponseUseCase(repository);
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
            Logger_1.Logger.danger('Error en TinnitusResponseController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteTinnitusResponseUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusResponseController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.TinnitusResponseController = TinnitusResponseController;
//# sourceMappingURL=TinnitusResponseController.js.map