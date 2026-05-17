import { Investigacion } from '../entities';
import { IInvestigacionRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateInvestigacionUseCase {
  constructor(private readonly repository: IInvestigacionRepository) {}

  async execute(data: { id_resource: string; content_resource: string }): Promise<Investigacion> {
    try {
      Logger.info('Creando investigación', { id_resource: data.id_resource });
      
      if (!data.id_resource || data.id_resource.trim() === '') {
        throw new Error('id_resource es requerido y no puede estar vacío');
      }
      
      if (!data.content_resource || data.content_resource.trim() === '') {
        throw new Error('content_resource es requerido y no puede estar vacío');
      }
      
      const result = await this.repository.create(data);
      
      Logger.success('Investigación creada exitosamente', { id_resource: result.id_resource });
      return result;
    } catch (error) {
      Logger.danger('Error al crear investigación', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllInvestigacionesUseCase {
  constructor(private readonly repository: IInvestigacionRepository) {}

  async execute(): Promise<Investigacion[]> {
    try {
      Logger.info('Obteniendo todas las investigaciones');
      
      const result = await this.repository.findAll();
      
      Logger.success('Investigaciones obtenidas', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener investigaciones', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetInvestigacionByIdUseCase {
  constructor(private readonly repository: IInvestigacionRepository) {}

  async execute(id: string): Promise<Investigacion[] | null> {
    try {
      IdValidator.validate(id, 'Investigacion');
      Logger.info('Obteniendo investigación por ID', { id });
      
      const result = await this.repository.findAllById(id);
      
      if (!result) {
        Logger.warning('Investigación no encontrada', { id });
        return null;
      }
      
      Logger.success('Investigación obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener investigación por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateInvestigacionUseCase {
  constructor(private readonly repository: IInvestigacionRepository) {}

  async execute(id_resource: string, data: { content_resource: string }): Promise<Investigacion> {
    try {
      IdValidator.validate(id_resource, 'Investigacion');
      Logger.info('Actualizando investigación', { id_resource });

      if (!data.content_resource || data.content_resource.trim() === '') {
        throw new Error('content_resource es requerido y no puede estar vacío');
      }

      const existing = await this.repository.findById(id_resource);
      if (!existing) {
        throw new Error('Investigación no encontrada');
      }

      const result = await this.repository.update(id_resource, data);

      Logger.success('Investigación actualizada exitosamente', { id_resource });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar investigación', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteInvestigacionUseCase {
  constructor(private readonly repository: IInvestigacionRepository) {}

  async execute(id_resource: string): Promise<void> {
    try {
      IdValidator.validate(id_resource, 'Investigacion');
      Logger.info('Eliminando investigación', { id_resource });

      const existing = await this.repository.findById(id_resource);
      if (!existing) {
        throw new Error('Investigación no encontrada');
      }

      await this.repository.delete(id_resource);

      Logger.success('Investigación eliminada exitosamente', { id_resource });
    } catch (error) {
      Logger.danger('Error al eliminar investigación', { error: (error as Error).message });
      throw error;
    }
  }
}