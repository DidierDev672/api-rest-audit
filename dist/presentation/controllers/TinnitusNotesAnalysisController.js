"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusNotesAnalysisController = void 0;
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const usecases_1 = require("../../domain/usecases");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const repository = new database_1.TinnitusNotesAnalysisRepository();
const patientRepository = new database_1.PatientRepository();
const questionnaireRepository = new database_1.TinnitusQuestionnaireRepository();
const responseRepository = new database_1.TinnitusResponseRepository();
class TinnitusNotesAnalysisController {
    static async create(req, res) {
        try {
            Logger_1.Logger.info('TinnitusNotesAnalysisController.create - Solicitud recibida', {
                body: req.body,
            });
            const data = dto_1.CreateTinnitusNotesAnalysisSchema.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusNotesAnalysisUseCase(repository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute({
                idPatient: data.id_patient,
                idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
                idTinnitusResponse: data.id_tinnitus_response,
                analysis: data.analysis,
                noteCount: data.note_count,
                analyzedAt: data.analyzed_at ? new Date(data.analyzed_at) : undefined,
            });
            Logger_1.Logger.success('TinnitusNotesAnalysisController.create - Análisis creado', { id: result.id });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.create - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('no encontrado') || errorMessage.includes('no existe')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.create - Entidad no encontrada', {
                    error: errorMessage,
                });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.create - Error interno', {
                error: errorMessage,
            });
            throw error;
        }
    }
    static async findAll(req, res) {
        try {
            Logger_1.Logger.info('TinnitusNotesAnalysisController.findAll - Solicitud recibida');
            const useCase = new usecases_1.GetAllTinnitusNotesAnalysisUseCase(repository);
            const result = await useCase.execute();
            Logger_1.Logger.success('TinnitusNotesAnalysisController.findAll - Análisis obtenidos', {
                count: result.length,
            });
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.findAll - Error', {
                error: error.message,
            });
            throw error;
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.findById - Solicitud recibida', { id });
            const useCase = new usecases_1.GetTinnitusNotesAnalysisByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.findById - Análisis no encontrado', { id });
                throw new errorHandler_1.NotFoundAppError(`Análisis de notas con ID ${id} no encontrado`);
            }
            Logger_1.Logger.success('TinnitusNotesAnalysisController.findById - Análisis obtenido', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.findById - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.findById - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByPatient(req, res) {
        try {
            const { patientId } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.findByPatient - Solicitud recibida', { patientId });
            const useCase = new usecases_1.GetTinnitusNotesAnalysisByPatientUseCase(repository);
            const result = await useCase.execute(patientId);
            Logger_1.Logger.success('TinnitusNotesAnalysisController.findByPatient - Análisis obtenidos', {
                count: result.length,
                patientId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.findByPatient - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.findByPatient - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByQuestionnaire(req, res) {
        try {
            const { questionnaireId } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.findByQuestionnaire - Solicitud recibida', { questionnaireId });
            const useCase = new usecases_1.GetTinnitusNotesAnalysisByQuestionnaireUseCase(repository);
            const result = await useCase.execute(questionnaireId);
            Logger_1.Logger.success('TinnitusNotesAnalysisController.findByQuestionnaire - Análisis obtenidos', {
                count: result.length,
                questionnaireId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.findByQuestionnaire - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.findByQuestionnaire - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByResponse(req, res) {
        try {
            const { responseId } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.findByResponse - Solicitud recibida', { responseId });
            const useCase = new usecases_1.GetTinnitusNotesAnalysisByResponseUseCase(repository);
            const result = await useCase.execute(responseId);
            Logger_1.Logger.success('TinnitusNotesAnalysisController.findByResponse - Análisis obtenidos', {
                count: result.length,
                responseId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.findByResponse - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.findByResponse - Error', { error: errorMessage });
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.update - Solicitud recibida', { id, body: req.body });
            const data = dto_1.CreateTinnitusNotesAnalysisSchema.partial().parse(req.body);
            const useCase = new usecases_1.UpdateTinnitusNotesAnalysisUseCase(repository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute(id, {
                idPatient: data.id_patient,
                idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
                idTinnitusResponse: data.id_tinnitus_response,
                analysis: data.analysis,
                noteCount: data.note_count,
                analyzedAt: data.analyzed_at ? new Date(data.analyzed_at) : undefined,
            });
            Logger_1.Logger.success('TinnitusNotesAnalysisController.update - Análisis actualizado', { id });
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.update - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.update - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            if (errorMessage.includes('no encontrado')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.update - Análisis no encontrado', { error: errorMessage });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.update - Error', { error: errorMessage });
            throw error;
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNotesAnalysisController.delete - Solicitud recibida', { id });
            const useCase = new usecases_1.DeleteTinnitusNotesAnalysisUseCase(repository);
            await useCase.execute(id);
            Logger_1.Logger.success('TinnitusNotesAnalysisController.delete - Análisis eliminado', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNotesAnalysisController.delete - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNotesAnalysisController.delete - Error', { error: errorMessage });
            throw error;
        }
    }
}
exports.TinnitusNotesAnalysisController = TinnitusNotesAnalysisController;
//# sourceMappingURL=TinnitusNotesAnalysisController.js.map