import { TinnitusNote } from '../entities';
import { ITinnitusNoteRepository, IPatientRepository, ITinnitusQuestionnaireRepository, ITinnitusResponseRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export interface CreateTinnitusNoteData {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  idTinnitusResponse: string;
  description: string;
}

export class CreateTinnitusNoteUseCase {
  constructor(
    private readonly repository: ITinnitusNoteRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository: ITinnitusQuestionnaireRepository,
    private readonly responseRepository: ITinnitusResponseRepository
  ) {}

  async execute(data: CreateTinnitusNoteData): Promise<TinnitusNote> {
    try {
      Logger.info('Iniciando creación de nota de tinnitus', {
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
      });

      Logger.success('Nota de tinnitus creada exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear nota de tinnitus', {
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

export class GetAllTinnitusNotesUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(): Promise<TinnitusNote[]> {
    try {
      Logger.info('Obteniendo todas las notas de tinnitus');

      const result = await this.repository.findAll();

      Logger.success('Notas de tinnitus obtenidas', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNoteByIdUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(id: string): Promise<TinnitusNote | null> {
    try {
      IdValidator.validate(id, 'TinnitusNote');
      Logger.info('Obteniendo nota de tinnitus por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Nota de tinnitus no encontrada', { id });
        return null;
      }

      Logger.success('Nota de tinnitus obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener nota de tinnitus por ID', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesByPatientUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(patientId: string): Promise<TinnitusNote[]> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Obteniendo notas de tinnitus por paciente', { patientId });

      const result = await this.repository.findByPatientId(patientId);

      Logger.success('Notas de tinnitus por paciente obtenidas', {
        count: result.length,
        patientId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tinnitus por paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesByQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(questionnaireId: string): Promise<TinnitusNote[]> {
    try {
      IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
      Logger.info('Obteniendo notas de tinnitus por cuestionario', { questionnaireId });

      const result = await this.repository.findByTinnitusQuestionnaireId(questionnaireId);

      Logger.success('Notas de tinnitus por cuestionario obtenidas', {
        count: result.length,
        questionnaireId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tinnitus por cuestionario', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusNotesByResponseUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(responseId: string): Promise<TinnitusNote[]> {
    try {
      IdValidator.validate(responseId, 'TinnitusResponse');
      Logger.info('Obteniendo notas de tinnitus por respuesta', { responseId });

      const result = await this.repository.findByTinnitusResponseId(responseId);

      Logger.success('Notas de tinnitus por respuesta obtenidas', {
        count: result.length,
        responseId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tinnitus por respuesta', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateTinnitusNoteUseCase {
  constructor(
    private readonly repository: ITinnitusNoteRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly questionnaireRepository: ITinnitusQuestionnaireRepository,
    private readonly responseRepository: ITinnitusResponseRepository
  ) {}

  async execute(id: string, data: Partial<TinnitusNote>): Promise<TinnitusNote> {
    try {
      IdValidator.validate(id, 'TinnitusNote');
      Logger.info('Actualizando nota de tinnitus', { id });

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

      Logger.success('Nota de tinnitus actualizada', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar nota de tinnitus', {
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

export class DeleteTinnitusNoteUseCase {
  constructor(private readonly repository: ITinnitusNoteRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusNote');
      Logger.info('Eliminando nota de tinnitus', { id });

      await this.repository.delete(id);

      Logger.success('Nota de tinnitus eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar nota de tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}