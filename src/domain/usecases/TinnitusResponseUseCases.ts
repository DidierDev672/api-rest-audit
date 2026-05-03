import { TinnitusResponse } from '../entities';
import { ITinnitusResponseRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateTinnitusResponseUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(data: Omit<TinnitusResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusResponse> {
    try {
      Logger.info('Creando respuesta de cuestionario de tinnitus', { 
        idPatient: data.idPatient,
        idTinnitusQuestionnaires: data.idTinnitusQuestionnaires 
      });
      
      const result = await this.repository.create(data);
      
      Logger.success('Respuesta de cuestionario de tinnitus creada exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear respuesta de cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllTinnitusResponsesUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(): Promise<TinnitusResponse[]> {
    try {
      Logger.info('Obteniendo todas las respuestas de cuestionarios de tinnitus');
      
      const result = await this.repository.findAll();
      
      Logger.success('Respuestas de cuestionarios de tinnitus obtenidas', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener respuestas de cuestionarios de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetTinnitusResponseByIdUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(id: string): Promise<TinnitusResponse | null> {
    try {
      IdValidator.validate(id, 'TinnitusResponse');
      Logger.info('Obteniendo respuesta de cuestionario de tinnitus por ID', { id });
      
      const result = await this.repository.findById(id);
      
      if (!result) {
        Logger.warning('Respuesta de cuestionario de tinnitus no encontrada', { id });
        return null;
      }
      
      Logger.success('Respuesta de cuestionario de tinnitus obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener respuesta de cuestionario de tinnitus por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetTinnitusResponsesByPatientIdUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(patientId: string): Promise<TinnitusResponse[]> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Obteniendo respuestas de cuestionarios de tinnitus por ID de paciente', { patientId });
      
      const result = await this.repository.findByPatientId(patientId);
      
      Logger.success('Respuestas de cuestionarios de tinnitus obtenidas por paciente', { patientId, count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener respuestas de cuestionarios de tinnitus por paciente', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetTinnitusResponsesByQuestionnaireIdUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(questionnaireId: string): Promise<TinnitusResponse[]> {
    try {
      IdValidator.validate(questionnaireId, 'TinnitusQuestionnaire');
      Logger.info('Obteniendo respuestas de cuestionarios de tinnitus por ID de cuestionario', { questionnaireId });
      
      const result = await this.repository.findByQuestionnaireId(questionnaireId);
      
      Logger.success('Respuestas de cuestionarios de tinnitus obtenidas por cuestionario', { questionnaireId, count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener respuestas de cuestionarios por cuestionario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateTinnitusResponseUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(id: string, data: Partial<TinnitusResponse>): Promise<TinnitusResponse> {
    try {
      IdValidator.validate(id, 'TinnitusResponse');
      Logger.info('Actualizando respuesta de cuestionario de tinnitus', { id });
      
      const result = await this.repository.update(id, data);
      
      Logger.success('Respuesta de cuestionario de tinnitus actualizada', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar respuesta de cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteTinnitusResponseUseCase {
  constructor(private readonly repository: ITinnitusResponseRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusResponse');
      Logger.info('Eliminando respuesta de cuestionario de tinnitus', { id });
      
      await this.repository.delete(id);
      
      Logger.success('Respuesta de cuestionario de tinnitus eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar respuesta de cuestionario de tinnitus', { error: (error as Error).message });
      throw error;
    }
  }
}