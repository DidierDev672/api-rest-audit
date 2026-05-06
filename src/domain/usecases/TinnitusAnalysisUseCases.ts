import { TinnitusAnalysis } from '../entities';
import { ITinnitusAnalysisRepository, IPatientRepository, ITinnitusQuestionnaireRepository, ITinnitusResponseRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export interface CreateTinnitusAnalysisData {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  idTinnitusResponse: string;
  analysis: string;
  model: string;
}

export class CreateTinnitusAnalysisUseCase {
  constructor(
    private readonly repository: ITinnitusAnalysisRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository: ITinnitusQuestionnaireRepository,
    private readonly responseRepository: ITinnitusResponseRepository
  ) {}

  async execute(data: CreateTinnitusAnalysisData): Promise<TinnitusAnalysis> {
    try {
      Logger.info('Iniciando creación de análisis de tinnitus', {
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

      Logger.success('Análisis de tinnitus creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear análisis de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private async validateReferences(patientId: string, questionnaireId: string, responseId: string): Promise<void> {
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

export class GetAllTinnitusAnalysisUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(): Promise<TinnitusAnalysis[]> {
    try {
      Logger.info('Obteniendo todos los análisis de tinnitus');

      const result = await this.repository.findAll();

      Logger.success('Análisis de tinnitus obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusAnalysisByIdUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(id: string): Promise<TinnitusAnalysis | null> {
    try {
      IdValidator.validate(id, 'TinnitusAnalysis');
      Logger.info('Obteniendo análisis de tinnitus por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Análisis de tinnitus no encontrado', { id });
        return null;
      }

      Logger.success('Análisis de tinnitus obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de tinnitus por ID', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusAnalysisByPatientUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(patientId: string): Promise<TinnitusAnalysis[]> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Obteniendo análisis de tinnitus por paciente', { patientId });

      const result = await this.repository.findByPatientId(patientId);

      Logger.success('Análisis de tinnitus por paciente obtenidos', {
        count: result.length,
        patientId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de tinnitus por paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusAnalysisByQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(questionnaireId: string): Promise<TinnitusAnalysis[]> {
    try {
      IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
      Logger.info('Obteniendo análisis de tinnitus por cuestionario', { questionnaireId });

      const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);

      Logger.success('Análisis de tinnitus por cuestionario obtenidos', {
        count: result.length,
        questionnaireId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de tinnitus por cuestionario', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusAnalysisByResponseUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(responseId: string): Promise<TinnitusAnalysis[]> {
    try {
      IdValidator.validate(responseId, 'TinnitusResponse');
      Logger.info('Obteniendo análisis de tinnitus por respuesta', { responseId });

      const result = await this.repository.findByTinnitusResponseId(responseId);

      Logger.success('Análisis de tinnitus por respuesta obtenidos', {
        count: result.length,
        responseId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de tinnitus por respuesta', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateTinnitusAnalysisUseCase {
  constructor(
    private readonly repository: ITinnitusAnalysisRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository: ITinnitusQuestionnaireRepository,
    private readonly responseRepository: ITinnitusResponseRepository
  ) {}

  async execute(id: string, data: Partial<TinnitusAnalysis>): Promise<TinnitusAnalysis> {
    try {
      IdValidator.validate(id, 'TinnitusAnalysis');
      Logger.info('Actualizando análisis de tinnitus', { id });

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

      Logger.success('Análisis de tinnitus actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar análisis de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private async validateReferences(patientId: string, questionnaireId: string, responseId: string): Promise<void> {
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

export class DeleteTinnitusAnalysisUseCase {
  constructor(private readonly repository: ITinnitusAnalysisRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusAnalysis');
      Logger.info('Eliminando análisis de tinnitus', { id });

      await this.repository.delete(id);

      Logger.success('Análisis de tinnitus eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar análisis de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}