"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTinnitusAnalysisUseCase = exports.UpdateTinnitusAnalysisUseCase = exports.GetTinnitusAnalysisByResponseUseCase = exports.GetTinnitusAnalysisByQuestionnaireUseCase = exports.GetTinnitusAnalysisByPatientUseCase = exports.GetTinnitusAnalysisByIdUseCase = exports.GetAllTinnitusAnalysisUseCase = exports.CreateTinnitusAnalysisUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateTinnitusAnalysisUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de análisis de tinnitus', {
                patientId: data.idPatient,
                questionnaireId: data.idTinnitusQuestionnaires,
                responseId: data.idTinnitusResponse,
            });
            if (!data.analysis || data.analysis.trim() === '') {
                throw new Error('El análisis no puede estar vacío');
            }
            await this.validateReferences(data.idPatient, data.idTinnitusQuestionnaires, data.idTinnitusResponse);
            const result = await this.repository.create({
                idPatient: data.idPatient,
                idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
                idTinnitusResponse: data.idTinnitusResponse,
                analysis: data.analysis,
                model: data.model,
            });
            Logger_1.Logger.success('Análisis de tinnitus creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear análisis de tinnitus', {
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
exports.CreateTinnitusAnalysisUseCase = CreateTinnitusAnalysisUseCase;
class GetAllTinnitusAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los análisis de tinnitus');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Análisis de tinnitus obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetAllTinnitusAnalysisUseCase = GetAllTinnitusAnalysisUseCase;
class GetTinnitusAnalysisByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusAnalysis');
            Logger_1.Logger.info('Obteniendo análisis de tinnitus por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Análisis de tinnitus no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Análisis de tinnitus obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de tinnitus por ID', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusAnalysisByIdUseCase = GetTinnitusAnalysisByIdUseCase;
class GetTinnitusAnalysisByPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(patientId) {
        try {
            IdValidator_1.IdValidator.validate(patientId, 'Patient');
            Logger_1.Logger.info('Obteniendo análisis de tinnitus por paciente', { patientId });
            const result = await this.repository.findByPatientId(patientId);
            Logger_1.Logger.success('Análisis de tinnitus por paciente obtenidos', {
                count: result.length,
                patientId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de tinnitus por paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusAnalysisByPatientUseCase = GetTinnitusAnalysisByPatientUseCase;
class GetTinnitusAnalysisByQuestionnaireUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(questionnaireId) {
        try {
            IdValidator_1.IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
            Logger_1.Logger.info('Obteniendo análisis de tinnitus por cuestionario', { questionnaireId });
            const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);
            Logger_1.Logger.success('Análisis de tinnitus por cuestionario obtenidos', {
                count: result.length,
                questionnaireId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de tinnitus por cuestionario', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusAnalysisByQuestionnaireUseCase = GetTinnitusAnalysisByQuestionnaireUseCase;
class GetTinnitusAnalysisByResponseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(responseId) {
        try {
            IdValidator_1.IdValidator.validate(responseId, 'TinnitusResponse');
            Logger_1.Logger.info('Obteniendo análisis de tinnitus por respuesta', { responseId });
            const result = await this.repository.findByTinnitusResponseId(responseId);
            Logger_1.Logger.success('Análisis de tinnitus por respuesta obtenidos', {
                count: result.length,
                responseId,
            });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis de tinnitus por respuesta', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.GetTinnitusAnalysisByResponseUseCase = GetTinnitusAnalysisByResponseUseCase;
class UpdateTinnitusAnalysisUseCase {
    constructor(repository, patientRepository, questionnaireRepository, responseRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.questionnaireRepository = questionnaireRepository;
        this.responseRepository = responseRepository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusAnalysis');
            Logger_1.Logger.info('Actualizando análisis de tinnitus', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Análisis de tinnitus no encontrado');
            }
            if (data.analysis !== undefined && (!data.analysis || data.analysis.trim() === '')) {
                throw new Error('El análisis no puede estar vacío');
            }
            if (data.idPatient || data.idTinnitusQuestionnaires || data.idTinnitusResponse) {
                const patientId = data.idPatient || existing.idPatient;
                const questionnaireId = data.idTinnitusQuestionnaires || existing.idTinnitusQuestionnaires;
                const responseId = data.idTinnitusResponse || existing.idTinnitusResponse;
                await this.validateReferences(patientId, questionnaireId, responseId);
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Análisis de tinnitus actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar análisis de tinnitus', {
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
exports.UpdateTinnitusAnalysisUseCase = UpdateTinnitusAnalysisUseCase;
class DeleteTinnitusAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'TinnitusAnalysis');
            Logger_1.Logger.info('Eliminando análisis de tinnitus', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Análisis de tinnitus eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar análisis de tinnitus', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.DeleteTinnitusAnalysisUseCase = DeleteTinnitusAnalysisUseCase;
//# sourceMappingURL=TinnitusAnalysisUseCases.js.map