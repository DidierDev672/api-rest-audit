import { TinnitusQuestionnaire, Question } from '../entities';
import { ITinnitusQuestionnaireRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateTinnitusQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(data: { title: string; description: string; questions: Question[] }): Promise<TinnitusQuestionnaire> {
    try {
      Logger.info('Creando cuestionario de tinnitus', { title: data.title });
      
      const result = await this.repository.create(data);
      
      Logger.success('Cuestionario de tinnitus creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllTinnitusQuestionnairesUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(): Promise<TinnitusQuestionnaire[]> {
    try {
      Logger.info('Obteniendo todos los cuestionarios de tinnitus');
      
      const result = await this.repository.findAll();
      
      Logger.success('Cuestionarios de tinnitus obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener cuestionarios de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetTinnitusQuestionnaireByIdUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(id: string): Promise<TinnitusQuestionnaire | null> {
    try {
      IdValidator.validate(id, 'TinnitusQuestionnaire');
      Logger.info('Obteniendo cuestionario de tinnitus por ID', { id });
      
      const result = await this.repository.findById(id);
      
      if (!result) {
        Logger.warning('Cuestionario de tinnitus no encontrado', { id });
        return null;
      }
      
      Logger.success('Cuestionario de tinnitus obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener cuestionario de tinnitus por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateTinnitusQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(id: string, data: Partial<TinnitusQuestionnaire>): Promise<TinnitusQuestionnaire> {
    try {
      IdValidator.validate(id, 'TinnitusQuestionnaire');
      Logger.info('Actualizando cuestionario de tinnitus', { id });
      
      const result = await this.repository.update(id, data);
      
      Logger.success('Cuestionario de tinnitus actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteTinnitusQuestionnaireUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusQuestionnaire');
      Logger.info('Eliminando cuestionario de tinnitus', { id });
      
      await this.repository.delete(id);
      
      Logger.success('Cuestionario de tinnitus eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}
