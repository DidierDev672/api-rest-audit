"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusAnalysisController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.TinnitusAnalysisRepository();
const patientRepository = new database_1.PatientRepository();
const questionnaireRepository = new database_1.TinnitusQuestionnaireRepository();
const responseRepository = new database_1.TinnitusResponseRepository();
class TinnitusAnalysisController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateTinnitusAnalysisSchema.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusAnalysisUseCase(repository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute({
                idPatient: data.id_patient,
                idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
                idTinnitusResponse: data.id_tinnitus_response,
                analysis: data.analysis,
                model: data.model,
            });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('no existe')) {
                res.status(404).json({ error: errorMessage });
                return;
            }
            if (errorMessage.includes('vacío') || errorMessage.includes('requerido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.create', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllTinnitusAnalysisUseCase(repository);
            const result = await useCase.execute();
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetTinnitusAnalysisByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Análisis de tinnitus no encontrado' });
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
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findByPatientId(req, res) {
        try {
            const { patientId } = req.params;
            const useCase = new usecases_1.GetTinnitusAnalysisByPatientUseCase(repository);
            const result = await useCase.execute(patientId);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.findByPatientId', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findByQuestionnaireId(req, res) {
        try {
            const { questionnaireId } = req.params;
            const useCase = new usecases_1.GetTinnitusAnalysisByQuestionnaireUseCase(repository);
            const result = await useCase.execute(questionnaireId);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.findByQuestionnaireId', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findByResponseId(req, res) {
        try {
            const { responseId } = req.params;
            const useCase = new usecases_1.GetTinnitusAnalysisByResponseUseCase(repository);
            const result = await useCase.execute(responseId);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.findByResponseId', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateTinnitusAnalysisSchema.parse(req.body);
            const transformedData = {};
            if (data.id_patient !== undefined)
                transformedData.idPatient = data.id_patient;
            if (data.id_tinnitus_questionnaires !== undefined)
                transformedData.idTinnitusQuestionnaires = data.id_tinnitus_questionnaires;
            if (data.id_tinnitus_response !== undefined)
                transformedData.idTinnitusResponse = data.id_tinnitus_response;
            if (data.analysis !== undefined)
                transformedData.analysis = data.analysis;
            if (data.model !== undefined)
                transformedData.model = data.model;
            const useCase = new usecases_1.UpdateTinnitusAnalysisUseCase(repository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute(id, transformedData);
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
            if (errorMessage.includes('no encontrado')) {
                res.status(404).json({ error: errorMessage });
                return;
            }
            if (errorMessage.includes('vacío')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteTinnitusAnalysisUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en TinnitusAnalysisController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.TinnitusAnalysisController = TinnitusAnalysisController;
//# sourceMappingURL=TinnitusAnalysisController.js.map