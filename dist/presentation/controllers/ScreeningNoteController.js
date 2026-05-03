"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningNoteController = void 0;
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const database_1 = require("../../infrastructure/database");
const database_2 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const usecases_1 = require("../../domain/usecases");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const noteRepository = new database_1.ScreeningNoteRepository();
const patientRepository = new database_2.PatientRepository();
const screeningRepository = new database_2.ScreeningRepository();
class ScreeningNoteController {
    static async create(req, res) {
        try {
            Logger_1.Logger.info('ScreeningNoteController.create - Solicitud recibida', {
                body: req.body,
            });
            const data = dto_1.CreateScreeningNoteSchema.parse(req.body);
            const useCase = new usecases_1.CreateScreeningNoteUseCase(noteRepository, patientRepository, screeningRepository);
            const result = await useCase.execute({
                idPatient: data.id_patient,
                idScreening: data.id_screening,
                idDoctor: data.id_doctor,
                titleNote: data.title_note,
                descriptionNote: data.description_note,
            });
            Logger_1.Logger.success('ScreeningNoteController.create - Nota creada', { id: result.id });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('ScreeningNoteController.create - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('no encontrado')) {
                Logger_1.Logger.warning('ScreeningNoteController.create - Entidad no encontrada', {
                    error: errorMessage,
                });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('ScreeningNoteController.create - Error interno', {
                error: errorMessage,
            });
            throw error;
        }
    }
    static async findAll(req, res) {
        try {
            Logger_1.Logger.info('ScreeningNoteController.findAll - Solicitud recibida');
            const useCase = new usecases_1.GetAllScreeningNotesUseCase(noteRepository);
            const result = await useCase.execute();
            Logger_1.Logger.success('ScreeningNoteController.findAll - Notas obtenidas', {
                count: result.length,
            });
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('ScreeningNoteController.findAll - Error', {
                error: error.message,
            });
            throw error;
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('ScreeningNoteController.findById - Solicitud recibida', { id });
            const useCase = new usecases_1.GetScreeningNoteByIdUseCase(noteRepository);
            const result = await useCase.execute(id);
            if (!result) {
                Logger_1.Logger.warning('ScreeningNoteController.findById - Nota no encontrada', { id });
                throw new errorHandler_1.NotFoundAppError(`Nota de tamizaje con ID ${id} no encontrada`);
            }
            Logger_1.Logger.success('ScreeningNoteController.findById - Nota obtenida', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('ScreeningNoteController.findById - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('ScreeningNoteController.findById - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByPatient(req, res) {
        try {
            const { patientId } = req.params;
            Logger_1.Logger.info('ScreeningNoteController.findByPatient - Solicitud recibida', { patientId });
            const useCase = new usecases_1.GetScreeningNotesByPatientUseCase(noteRepository);
            const result = await useCase.execute(patientId);
            Logger_1.Logger.success('ScreeningNoteController.findByPatient - Notas obtenidas', {
                count: result.length,
                patientId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('ScreeningNoteController.findByPatient - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('ScreeningNoteController.findByPatient - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByScreening(req, res) {
        try {
            const { screeningId } = req.params;
            Logger_1.Logger.info('ScreeningNoteController.findByScreening - Solicitud recibida', { screeningId });
            const useCase = new usecases_1.GetScreeningNotesByScreeningUseCase(noteRepository);
            const result = await useCase.execute(screeningId);
            Logger_1.Logger.success('ScreeningNoteController.findByScreening - Notas obtenidas', {
                count: result.length,
                screeningId,
            });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('ScreeningNoteController.findByScreening - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('ScreeningNoteController.findByScreening - Error', { error: errorMessage });
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('ScreeningNoteController.update - Solicitud recibida', { id, body: req.body });
            const data = dto_1.UpdateScreeningNoteSchema.parse(req.body);
            const useCase = new usecases_1.UpdateScreeningNoteUseCase(noteRepository, patientRepository, screeningRepository);
            const result = await useCase.execute(id, {
                idPatient: data.id_patient,
                idScreening: data.id_screening,
                idDoctor: data.id_doctor,
                titleNote: data.title_note,
                descriptionNote: data.description_note,
            });
            Logger_1.Logger.success('ScreeningNoteController.update - Nota actualizada', { id });
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('ScreeningNoteController.update - Error de validación Zod', {
                    errors: error.errors,
                });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('ScreeningNoteController.update - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            if (errorMessage.includes('no encontrado')) {
                Logger_1.Logger.warning('ScreeningNoteController.update - Nota no encontrada', { error: errorMessage });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('ScreeningNoteController.update - Error', { error: errorMessage });
            throw error;
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('ScreeningNoteController.delete - Solicitud recibida', { id });
            const useCase = new usecases_1.DeleteScreeningNoteUseCase(noteRepository);
            await useCase.execute(id);
            Logger_1.Logger.success('ScreeningNoteController.delete - Nota eliminada', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('ScreeningNoteController.delete - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('ScreeningNoteController.delete - Error', { error: errorMessage });
            throw error;
        }
    }
}
exports.ScreeningNoteController = ScreeningNoteController;
//# sourceMappingURL=ScreeningNoteController.js.map