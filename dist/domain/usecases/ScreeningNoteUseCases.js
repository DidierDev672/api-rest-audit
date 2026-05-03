"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScreeningNoteUseCase = exports.UpdateScreeningNoteUseCase = exports.GetScreeningNotesByScreeningUseCase = exports.GetScreeningNotesByPatientUseCase = exports.GetScreeningNoteByIdUseCase = exports.GetAllScreeningNotesUseCase = exports.CreateScreeningNoteUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const ScreeningNoteValidator_1 = require("../../infrastructure/validators/ScreeningNoteValidator");
class CreateScreeningNoteUseCase {
    constructor(repository, patientRepository, screeningRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.screeningRepository = screeningRepository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de nota de tamizaje', {
                patientId: data.idPatient,
                screeningId: data.idScreening,
            });
            await ScreeningNoteValidator_1.ScreeningNoteValidator.validatePatientAndScreening(data.idPatient, data.idScreening, this.patientRepository, this.screeningRepository);
            const result = await this.repository.create({
                idPatient: data.idPatient,
                idScreening: data.idScreening,
                idDoctor: data.idDoctor,
                titleNote: data.titleNote,
                descriptionNote: data.descriptionNote,
            });
            Logger_1.Logger.success('Nota de tamizaje creada exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear nota de tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.CreateScreeningNoteUseCase = CreateScreeningNoteUseCase;
class GetAllScreeningNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todas las notas de tamizaje');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Notas de tamizaje obtenidas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllScreeningNotesUseCase = GetAllScreeningNotesUseCase;
class GetScreeningNoteByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            ScreeningNoteValidator_1.ScreeningNoteValidator.validateId(id, 'ScreeningNote');
            Logger_1.Logger.info('Obteniendo nota de tamizaje por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Nota de tamizaje no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Nota de tamizaje obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener nota de tamizaje por ID', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetScreeningNoteByIdUseCase = GetScreeningNoteByIdUseCase;
class GetScreeningNotesByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            ScreeningNoteValidator_1.ScreeningNoteValidator.validateId(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo notas de tamizaje por paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Notas de tamizaje por paciente obtenidas', {
                count: result.length,
                patientId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tamizaje por paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetScreeningNotesByPatientUseCase = GetScreeningNotesByPatientUseCase;
class GetScreeningNotesByScreeningUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(screeningId) {
        try {
            ScreeningNoteValidator_1.ScreeningNoteValidator.validateId(screeningId, 'Screening');
            Logger_1.Logger.info('Obteniendo notas de tamizaje por tamizaje', { screeningId });
            const result = await this.repository.findByScreeningId(screeningId);
            Logger_1.Logger.success('Notas de tamizaje por tamizaje obtenidas', {
                count: result.length,
                screeningId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tamizaje por tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetScreeningNotesByScreeningUseCase = GetScreeningNotesByScreeningUseCase;
class UpdateScreeningNoteUseCase {
    constructor(repository, patientRepository, screeningRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.screeningRepository = screeningRepository;
    }
    async execute(id, data) {
        try {
            ScreeningNoteValidator_1.ScreeningNoteValidator.validateId(id, 'ScreeningNote');
            Logger_1.Logger.info('Actualizando nota de tamizaje', { id });
            if (data.idPatient || data.idScreening) {
                const patientId = data.idPatient || (await this.repository.findById(id))?.idPatient;
                const screeningId = data.idScreening || (await this.repository.findById(id))?.idScreening;
                if (patientId && screeningId) {
                    await ScreeningNoteValidator_1.ScreeningNoteValidator.validatePatientAndScreening(patientId, screeningId, this.patientRepository, this.screeningRepository);
                }
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Nota de tamizaje actualizada', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar nota de tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.UpdateScreeningNoteUseCase = UpdateScreeningNoteUseCase;
class DeleteScreeningNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            ScreeningNoteValidator_1.ScreeningNoteValidator.validateId(id, 'ScreeningNote');
            Logger_1.Logger.info('Eliminando nota de tamizaje', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Nota de tamizaje eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar nota de tamizaje', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteScreeningNoteUseCase = DeleteScreeningNoteUseCase;
//# sourceMappingURL=ScreeningNoteUseCases.js.map