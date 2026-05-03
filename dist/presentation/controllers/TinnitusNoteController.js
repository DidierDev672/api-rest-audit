"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusNoteController = void 0;
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const usecases_1 = require("../../domain/usecases");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const noteRepository = new database_1.TinnitusNoteRepository();
const patientRepository = new database_1.PatientRepository();
const questionnaireRepository = new database_1.TinnitusQuestionnaireRepository();
const responseRepository = new database_1.TinnitusResponseRepository();
class TinnitusNoteController {
    static async create(req, res) {
        try {
            Logger_1.Logger.info('TinnitusNoteController.create - Solicitud recibida', {
                body: req.body,
            });
            const data = dto_1.CreateTinnitusNoteSchema.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusNoteUseCase(noteRepository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute({
                idPatient: data.id_patient,
                idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
                idTinnitusResponse: data.id_tinnitus_response,
                description: data.description,
            });
            Logger_1.Logger.success('TinnitusNoteController.create - Nota creada', { id: result.id });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('TinnitusNoteController.create - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('no encontrado') || errorMessage.includes('no existe')) {
                Logger_1.Logger.warning('TinnitusNoteController.create - Entidad no encontrada', {
                    error: errorMessage,
                });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('TinnitusNoteController.create - Error interno', {
                error: errorMessage,
            });
            throw error;
        }
    }
    static async findAll(req, res) {
        try {
            Logger_1.Logger.info('TinnitusNoteController.findAll - Solicitud recibida');
            const useCase = new usecases_1.GetAllTinnitusNotesUseCase(noteRepository);
            const result = await useCase.execute();
            Logger_1.Logger.success('TinnitusNoteController.findAll - Notas obtenidas', {
                count: result.length,
            });
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('TinnitusNoteController.findAll - Error', {
                error: error.message,
            });
            throw error;
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.findById - Solicitud recibida', { id });
            const useCase = new usecases_1.GetTinnitusNoteByIdUseCase(noteRepository);
            const result = await useCase.execute(id);
            if (!result) {
                Logger_1.Logger.warning('TinnitusNoteController.findById - Nota no encontrada', { id });
                throw new errorHandler_1.NotFoundAppError(`Nota de tinnitus con ID ${id} no encontrada`);
            }
            Logger_1.Logger.success('TinnitusNoteController.findById - Nota obtenida', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.findById - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNoteController.findById - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByPatient(req, res) {
        try {
            const { patientId } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.findByPatient - Solicitud recibida', { patientId });
            const useCase = new usecases_1.GetTinnitusNotesByPatientUseCase(noteRepository);
            const result = await useCase.execute(patientId);
            Logger_1.Logger.success('TinnitusNoteController.findByPatient - Notas obtenidas', {
                count: result.length,
                patientId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.findByPatient - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNoteController.findByPatient - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByQuestionnaire(req, res) {
        try {
            const { questionnaireId } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.findByQuestionnaire - Solicitud recibida', { questionnaireId });
            const useCase = new usecases_1.GetTinnitusNotesByQuestionnaireUseCase(noteRepository);
            const result = await useCase.execute(questionnaireId);
            Logger_1.Logger.success('TinnitusNoteController.findByQuestionnaire - Notas obtenidas', {
                count: result.length,
                questionnaireId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.findByQuestionnaire - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNoteController.findByQuestionnaire - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByResponse(req, res) {
        try {
            const { responseId } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.findByResponse - Solicitud recibida', { responseId });
            const useCase = new usecases_1.GetTinnitusNotesByResponseUseCase(noteRepository);
            const result = await useCase.execute(responseId);
            Logger_1.Logger.success('TinnitusNoteController.findByResponse - Notas obtenidas', {
                count: result.length,
                responseId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.findByResponse - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNoteController.findByResponse - Error', { error: errorMessage });
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.update - Solicitud recibida', { id, body: req.body });
            const data = dto_1.UpdateTinnitusNoteSchema.parse(req.body);
            const useCase = new usecases_1.UpdateTinnitusNoteUseCase(noteRepository, patientRepository, questionnaireRepository, responseRepository);
            const result = await useCase.execute(id, {
                idPatient: data.id_patient,
                idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
                idTinnitusResponse: data.id_tinnitus_response,
                description: data.description,
            });
            Logger_1.Logger.success('TinnitusNoteController.update - Nota actualizada', { id });
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('TinnitusNoteController.update - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.update - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            if (errorMessage.includes('no encontrado')) {
                Logger_1.Logger.warning('TinnitusNoteController.update - Nota no encontrada', { error: errorMessage });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('TinnitusNoteController.update - Error', { error: errorMessage });
            throw error;
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('TinnitusNoteController.delete - Solicitud recibida', { id });
            const useCase = new usecases_1.DeleteTinnitusNoteUseCase(noteRepository);
            await useCase.execute(id);
            Logger_1.Logger.success('TinnitusNoteController.delete - Nota eliminada', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('TinnitusNoteController.delete - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('TinnitusNoteController.delete - Error', { error: errorMessage });
            throw error;
        }
    }
}
exports.TinnitusNoteController = TinnitusNoteController;
//# sourceMappingURL=TinnitusNoteController.js.map