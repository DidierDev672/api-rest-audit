"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTinnitusNoteUseCase = exports.UpdateTinnitusNoteUseCase = exports.GetTinnitusNotesByResponseUseCase = exports.GetTinnitusNotesByQuestionnaireUseCase = exports.GetTinnitusNotesByPatientUseCase = exports.GetTinnitusNoteByIdUseCase = exports.GetAllTinnitusNotesUseCase = exports.CreateTinnitusNoteUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateTinnitusNoteUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de nota de tinnitus', {
                patientId: data.idPatient,
                questionnaireId: data.idTinnitusQuestionnaires,
                responseId: data.idTinnitusResponse,
            });
            await this.validateReferences(data.idPatient, data.idTinnitusQuestionnaires, data.idTinnitusResponse);
            const result = await this.repository.create({
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
                idTinnitusResponse: data.idTinnitusResponse,
                description: data.description,
                color: data.color,
                source: data.source,
            });
            Logger_1.Logger.success('Nota de tinnitus creada exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear nota de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
    async validateReferences(patientId, questionnaireId, responseId) {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
            throw new Error('El paciente no existe');
        }
        const questionnaire = await this.questionnaireRepository.findById(questionnaireId);
        if (!questionnaire) {
            throw new Error('El cuestionario de tinnitus no existe');
        }
        const response = await this.responseRepository.findById(responseId);
        if (!response) {
            throw new Error('La respuesta de tinnitus no existe');
        }
    }
}
exports.CreateTinnitusNoteUseCase = CreateTinnitusNoteUseCase;
class GetAllTinnitusNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todas las notas de tinnitus');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Notas de tinnitus obtenidas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllTinnitusNotesUseCase = GetAllTinnitusNotesUseCase;
class GetTinnitusNoteByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNote');
            Logger_1.Logger.info('Obteniendo nota de tinnitus por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Nota de tinnitus no encontrada', { id });
                return null;
            }
            Logger_1.Logger.success('Nota de tinnitus obtenida', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener nota de tinnitus por ID', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNoteByIdUseCase = GetTinnitusNoteByIdUseCase;
class GetTinnitusNotesByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo notas de tinnitus por paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Notas de tinnitus por paciente obtenidas', {
                count: result.length,
                patientId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesByPatientUseCase = GetTinnitusNotesByPatientUseCase;
class GetTinnitusNotesByQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(questionnaireId) {
        try {
            IdValidator_1.IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Obteniendo notas de tinnitus por cuestionario', { questionnaireId });
            const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);
            Logger_1.Logger.success('Notas de tinnitus por cuestionario obtenidas', {
                count: result.length,
                questionnaireId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por cuestionario', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesByQuestionnaireUseCase = GetTinnitusNotesByQuestionnaireUseCase;
class GetTinnitusNotesByResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(responseId) {
        try {
            IdValidator_1.IdValidator.validate(responseId, 'TinnitusResponse');
            Logger_1.Logger.info('Obteniendo notas de tinnitus por respuesta', { responseId });
            const result = await this.repository.findByTinnitusResponseId(responseId);
            Logger_1.Logger.success('Notas de tinnitus por respuesta obtenidas', {
                count: result.length,
                responseId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por respuesta', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesByResponseUseCase = GetTinnitusNotesByResponseUseCase;
class UpdateTinnitusNoteUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNote');
            Logger_1.Logger.info('Actualizando nota de tinnitus', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Nota de tinnitus no encontrada');
            }
            if (data.idPatient || data.idTinnitusQuestionnaires || data.idTinnitusResponse) {
                const patientId = data.idPatient || existing.idPatient;
                const questionnaireId = data.idTinnitusQuestionnaires || existing.idTinnitusQuestionnaires;
                const responseId = data.idTinnitusResponse || existing.idTinnitusResponse;
                await this.validateReferences(patientId, questionnaireId, responseId);
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Nota de tinnitus actualizada', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar nota de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
    async validateReferences(patientId, questionnaireId, responseId) {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
            throw new Error('El paciente no existe');
        }
        const questionnaire = await this.questionnaireRepository.findById(questionnaireId);
        if (!questionnaire) {
            throw new Error('El cuestionario de tinnitus no existe');
        }
        const response = await this.responseRepository.findById(responseId);
        if (!response) {
            throw new Error('La respuesta de tinnitus no existe');
        }
    }
}
exports.UpdateTinnitusNoteUseCase = UpdateTinnitusNoteUseCase;
class DeleteTinnitusNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNote');
            Logger_1.Logger.info('Eliminando nota de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Nota de tinnitus eliminada', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar nota de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteTinnitusNoteUseCase = DeleteTinnitusNoteUseCase;
//# sourceMappingURL=TinnitusNoteUseCases.js.map