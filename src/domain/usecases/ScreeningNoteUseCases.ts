import { ScreeningNote } from '../entities';
import { IScreeningNoteRepository, IPatientRepository, IScreeningRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { ScreeningNoteValidator } from '../../infrastructure/validators/ScreeningNoteValidator';

export interface CreateScreeningNoteData {
  idPatient: string;
  idScreening: string;
  idDoctor: string;
  titleNote: string;
  descriptionNote: string;
}

export class CreateScreeningNoteUseCase {
  constructor(
    private readonly repository: IScreeningNoteRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly screeningRepository: IScreeningRepository
  ) {}

  async execute(data: CreateScreeningNoteData): Promise<ScreeningNote> {
    try {
      Logger.info('Iniciando creación de nota de tamizaje', {
        patientId: data.idPatient,
        screeningId: data.idScreening,
      });

      await ScreeningNoteValidator.validatePatientAndScreening(
        data.idPatient,
        data.idScreening,
        this.patientRepository,
        this.screeningRepository
      );

      const result = await this.repository.create({
        idPatient: data.idPatient,
        idScreening: data.idScreening,
        idDoctor: data.idDoctor,
        titleNote: data.titleNote,
        descriptionNote: data.descriptionNote,
      });

      Logger.success('Nota de tamizaje creada exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear nota de tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetAllScreeningNotesUseCase {
  constructor(private readonly repository: IScreeningNoteRepository) {}

  async execute(): Promise<ScreeningNote[]> {
    try {
      Logger.info('Obteniendo todas las notas de tamizaje');

      const result = await this.repository.findAll();

      Logger.success('Notas de tamizaje obtenidas', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetScreeningNoteByIdUseCase {
  constructor(private readonly repository: IScreeningNoteRepository) {}

  async execute(id: string): Promise<ScreeningNote | null> {
    try {
      ScreeningNoteValidator.validateId(id, 'ScreeningNote');
      Logger.info('Obteniendo nota de tamizaje por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Nota de tamizaje no encontrada', { id });
        return null;
      }

      Logger.success('Nota de tamizaje obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener nota de tamizaje por ID', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetScreeningNotesByPatientUseCase {
  constructor(private readonly repository: IScreeningNoteRepository) {}

  async execute(patientId: string): Promise<ScreeningNote[]> {
    try {
      ScreeningNoteValidator.validateId(patientId, 'Patient');
      Logger.info('Obteniendo notas de tamizaje por paciente', { patientId });

      const result = await this.repository.findByPatientId(patientId);

      Logger.success('Notas de tamizaje por paciente obtenidas', {
        count: result.length,
        patientId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tamizaje por paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetScreeningNotesByScreeningUseCase {
  constructor(private readonly repository: IScreeningNoteRepository) {}

  async execute(screeningId: string): Promise<ScreeningNote[]> {
    try {
      ScreeningNoteValidator.validateId(screeningId, 'Screening');
      Logger.info('Obteniendo notas de tamizaje por tamizaje', { screeningId });

      const result = await this.repository.findByScreeningId(screeningId);

      Logger.success('Notas de tamizaje por tamizaje obtenidas', {
        count: result.length,
        screeningId,
      });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener notas de tamizaje por tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateScreeningNoteUseCase {
  constructor(
    private readonly repository: IScreeningNoteRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly screeningRepository: IScreeningRepository
  ) {}

  async execute(id: string, data: Partial<ScreeningNote>): Promise<ScreeningNote> {
    try {
      ScreeningNoteValidator.validateId(id, 'ScreeningNote');
      Logger.info('Actualizando nota de tamizaje', { id });

      if (data.idPatient || data.idScreening) {
        const patientId = data.idPatient || (await this.repository.findById(id))?.idPatient;
        const screeningId = data.idScreening || (await this.repository.findById(id))?.idScreening;

        if (patientId && screeningId) {
          await ScreeningNoteValidator.validatePatientAndScreening(
            patientId,
            screeningId,
            this.patientRepository,
            this.screeningRepository
          );
        }
      }

      const result = await this.repository.update(id, data);

      Logger.success('Nota de tamizaje actualizada', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar nota de tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeleteScreeningNoteUseCase {
  constructor(private readonly repository: IScreeningNoteRepository) {}

  async execute(id: string): Promise<void> {
    try {
      ScreeningNoteValidator.validateId(id, 'ScreeningNote');
      Logger.info('Eliminando nota de tamizaje', { id });

      await this.repository.delete(id);

      Logger.success('Nota de tamizaje eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar nota de tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
