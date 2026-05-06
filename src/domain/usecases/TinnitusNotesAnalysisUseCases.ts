import { TinnitusNotesAnalysis } from '../entities';
import {
  ITinnitusNotesAnalysisRepository,
  IPatientRepository,
  ITinnitusQuestionnaireRepository,
  ITinnitusResponseRepository
} from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export interface CreateTinnitusNotesAnalysisData {
  idPatient: string;
  idTinnitusQuestionnaires?: string;
  idTinnitusResponse?: string;
  analysis: string;
  noteCount?: number;
  analyzedAt?: Date;
  createdBy?: string;
}

export class CreateTinnitusNotesAnalysisUseCase {
  constructor(
    private readonly repository: ITinnitusNotesAnalysisRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository?: ITinnitusQuestionnaireRepository,
    private readonly responseRepository?: ITinnitusResponseRepository
  ) {}

  async execute(data: CreateTinnitusNotesAnalysisData): Promise<TinnitusNotesAnalysis> {
    try {
      Logger.info('Iniciando creación de análisis de notas de tinnitus', {
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

      Logger.success('Análisis de notas de tinnitus creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear análisis de notas de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private async validateReferences(data: CreateTinnitusNotesAnalysisData): Promise<void> {
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

export class GetAllTinnitusNotesAnalysisUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(): Promise<TinnitusNotesAnalysis[]> {
    try {
      Logger.info('Obteniendo todos los análisis de notas de tinnitus');

      const result = await this.repository.findAll();

      Logger.success('Análisis de notas de tinnitus obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesAnalysisByIdUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(id: string): Promise<TinnitusNotesAnalysis | null> {
    try {
      IdValidator.validate(id, 'TinnitusNotesAnalysis');
      Logger.info('Obteniendo análisis de notas de tinnitus por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Análisis de notas de tinnitus no encontrado', { id });
        return null;
      }

      Logger.success('Análisis de notas de tinnitus obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por ID', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesAnalysisByPatientUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(patientId: string): Promise<TinnitusNotesAnalysis[]> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Obteniendo análisis de notas de tinnitus por paciente', { patientId });

      const result = await this.repository.findByPatientId(patientId);

      Logger.success('Análisis de notas de tinnitus por paciente obtenidos', {
        count: result.length,
        patientId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesAnalysisByQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(questionnaireId: string): Promise<TinnitusNotesAnalysis[]> {
    try {
      IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
      Logger.info('Obteniendo análisis de notas de tinnitus por cuestionario', { questionnaireId });

      const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);

      Logger.success('Análisis de notas de tinnitus por cuestionario obtenidos', {
        count: result.length,
        questionnaireId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por cuestionario', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesAnalysisByResponseUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(responseId: string): Promise<TinnitusNotesAnalysis[]> {
    try {
      IdValidator.validate(responseId, 'TinnitusResponse');
      Logger.info('Obteniendo análisis de notas de tinnitus por respuesta', { responseId });

      const result = await this.repository.findByTinnitusResponseId(responseId);

      Logger.success('Análisis de notas de tinnitus por respuesta obtenidos', {
        count: result.length,
        responseId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por respuesta', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateTinnitusNotesAnalysisUseCase {
  constructor(
    private readonly repository: ITinnitusNotesAnalysisRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository?: ITinnitusQuestionnaireRepository,
    private readonly responseRepository?: ITinnitusResponseRepository
  ) {}

  async execute(id: string, data: Partial<TinnitusNotesAnalysis>): Promise<TinnitusNotesAnalysis> {
    try {
      IdValidator.validate(id, 'TinnitusNotesAnalysis');
      Logger.info('Actualizando análisis de notas de tinnitus', { id });

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

      Logger.success('Análisis de notas de tinnitus actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar análisis de notas de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private async validateReferences(data: {
    idPatient: string;
    idTinnitusQuestionnaires?: string;
    idTinnitusResponse?: string;
  }): Promise<void> {
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

export class DeleteTinnitusNotesAnalysisUseCase {
  constructor(private readonly repository: ITinnitusNotesAnalysisRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusNotesAnalysis');
      Logger.info('Eliminando análisis de notas de tinnitus', { id });

      await this.repository.delete(id);

      Logger.success('Análisis de notas de tinnitus eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar análisis de notas de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
