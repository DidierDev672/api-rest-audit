"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTinnitusNotesAnalysisUseCase = exports.UpdateTinnitusNotesAnalysisUseCase = exports.GetTinnitusNotesAnalysisByResponseUseCase = exports.GetTinnitusNotesAnalysisByQuestionnaireUseCase = exports.GetTinnitusNotesAnalysisByPatientUseCase = exports.GetTinnitusNotesAnalysisByIdUseCase = exports.GetAllTinnitusNotesAnalysisUseCase = exports.CreateTinnitusNotesAnalysisUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateTinnitusNotesAnalysisUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de análisis de notas de tinnitus', {
                patientId: data.idPatient,
                questionnaireId: data.idTinnitusQuestionnaires,
                responseId: data.idTinnitusResponse,
            });
            await this.validateReferences(data);
            const result = await this.repository.create({
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
                idTinnitusResponse: data.idTinnitusResponse,
                analysis: data.analysis,
                noteCount: data.noteCount,
                analyzedAt: data.analyzedAt,
                createdBy: data.createdBy,
            });
            Logger_1.Logger.success('Análisis de notas de tinnitus creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear análisis de notas de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
    async validateReferences(data) {
        const patient = await this.patientRepository.findById(data.idPatient);
        if (!patient) {
            throw new Error('El paciente no existe');
        }
        if (data.idTinnitusQuestionnaires && this.questionnaireRepository) {
            const questionnaire = await this.questionnaireRepository.findById(data.idTinnitusQuestionnaires);
            if (!questionnaire) {
                throw new Error('El cuestionario de tinnitus no existe');
            }
        }
        if (data.idTinnitusResponse && this.responseRepository) {
            const response = await this.responseRepository.findById(data.idTinnitusResponse);
            if (!response) {
                throw new Error('La respuesta de tinnitus no existe');
            }
        }
    }
}
exports.CreateTinnitusNotesAnalysisUseCase = CreateTinnitusNotesAnalysisUseCase;
class GetAllTinnitusNotesAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los análisis de notas de tinnitus');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Análisis de notas de tinnitus obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllTinnitusNotesAnalysisUseCase = GetAllTinnitusNotesAnalysisUseCase;
class GetTinnitusNotesAnalysisByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNotesAnalysis');
            Logger_1.Logger.info('Obteniendo análisis de notas de tinnitus por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Análisis de notas de tinnitus no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Análisis de notas de tinnitus obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas de tinnitus por ID', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesAnalysisByIdUseCase = GetTinnitusNotesAnalysisByIdUseCase;
class GetTinnitusNotesAnalysisByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo análisis de notas de tinnitus por paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Análisis de notas de tinnitus por paciente obtenidos', {
                count: result.length,
                patientId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas de tinnitus por paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesAnalysisByPatientUseCase = GetTinnitusNotesAnalysisByPatientUseCase;
class GetTinnitusNotesAnalysisByQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(questionnaireId) {
        try {
            IdValidator_1.IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Obteniendo análisis de notas de tinnitus por cuestionario', { questionnaireId });
            const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);
            Logger_1.Logger.success('Análisis de notas de tinnitus por cuestionario obtenidos', {
                count: result.length,
                questionnaireId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas de tinnitus por cuestionario', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesAnalysisByQuestionnaireUseCase = GetTinnitusNotesAnalysisByQuestionnaireUseCase;
class GetTinnitusNotesAnalysisByResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(responseId) {
        try {
            IdValidator_1.IdValidator.validate(responseId, 'TinnitusResponse');
            Logger_1.Logger.info('Obteniendo análisis de notas de tinnitus por respuesta', { responseId });
            const result = await this.repository.findByTinnitusResponseId(responseId);
            Logger_1.Logger.success('Análisis de notas de tinnitus por respuesta obtenidos', {
                count: result.length,
                responseId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas de tinnitus por respuesta', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusNotesAnalysisByResponseUseCase = GetTinnitusNotesAnalysisByResponseUseCase;
class UpdateTinnitusNotesAnalysisUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNotesAnalysis');
            Logger_1.Logger.info('Actualizando análisis de notas de tinnitus', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Análisis de notas de tinnitus no encontrado');
            }
            if (data.idPatient || data.idTinnitusQuestionnaires || data.idTinnitusResponse) {
                const patientId = data.idPatient || existing.idPatient;
                const questionnaireId = data.idTinnitusQuestionnaires || existing.idTinnitusQuestionnaires;
                const responseId = data.idTinnitusResponse || existing.idTinnitusResponse;
                await this.validateReferences({
                    idPatient: patientId,
                    idTinnitusQuestionnaires: questionnaireId,
                    idTinnitusResponse: responseId,
                });
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Análisis de notas de tinnitus actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar análisis de notas de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
    async validateReferences(data) {
        const patient = await this.patientRepository.findById(data.idPatient);
        if (!patient) {
            throw new Error('El paciente no existe');
        }
        if (data.idTinnitusQuestionnaires && this.questionnaireRepository) {
            const questionnaire = await this.questionnaireRepository.findById(data.idTinnitusQuestionnaires);
            if (!questionnaire) {
                throw new Error('El cuestionario de tinnitus no existe');
            }
        }
        if (data.idTinnitusResponse && this.responseRepository) {
            const response = await this.responseRepository.findById(data.idTinnitusResponse);
            if (!response) {
                throw new Error('La respuesta de tinnitus no existe');
            }
        }
    }
}
exports.UpdateTinnitusNotesAnalysisUseCase = UpdateTinnitusNotesAnalysisUseCase;
class DeleteTinnitusNotesAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusNotesAnalysis');
            Logger_1.Logger.info('Eliminando análisis de notas de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Análisis de notas de tinnitus eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar análisis de notas de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteTinnitusNotesAnalysisUseCase = DeleteTinnitusNotesAnalysisUseCase;
//# sourceMappingURL=TinnitusNotesAnalysisUseCases.js.map