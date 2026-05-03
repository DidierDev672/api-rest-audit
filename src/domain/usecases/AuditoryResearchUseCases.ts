import { AuditoryResearch } from '../entities';
import { IAuditoryResearchRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateAuditoryResearchUseCase {
  constructor(private readonly repository: IAuditoryResearchRepository) {}

  async execute(data: { name: string; description: string }): Promise<AuditoryResearch> {
    try {
      Logger.info('Creando investigación auditiva', { name: data.name });
      
      const result = await this.repository.create(data);
      
      Logger.success('Investigación auditiva creada exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear investigación auditiva', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllAuditoryResearchUseCase {
  constructor(private readonly repository: IAuditoryResearchRepository) {}

  async execute(): Promise<AuditoryResearch[]> {
    try {
      Logger.info('Obteniendo todas las investigaciones auditivas');
      
      const result = await this.repository.findAll();
      
      Logger.success('Investigaciones auditivas obtenidas', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener investigaciones auditivas', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAuditoryResearchByIdUseCase {
  constructor(private readonly repository: IAuditoryResearchRepository) {}

  async execute(id: string): Promise<AuditoryResearch | null> {
    try {
      IdValidator.validate(id, 'AuditoryResearch');
      Logger.info('Obteniendo investigación auditiva por ID', { id });
      
      const result = await this.repository.findById(id);
      
      if (!result) {
        Logger.warning('Investigación auditiva no encontrada', { id });
        return null;
      }
      
      Logger.success('Investigación auditiva obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener investigación auditiva por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateAuditoryResearchUseCase {
  constructor(private readonly repository: IAuditoryResearchRepository) {}

  async execute(id: string, data: Partial<AuditoryResearch>): Promise<AuditoryResearch> {
    try {
      IdValidator.validate(id, 'AuditoryResearch');
      Logger.info('Actualizando investigación auditiva', { id });
      
      const result = await this.repository.update(id, data);
      
      Logger.success('Investigación auditiva actualizada', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar investigación auditiva', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteAuditoryResearchUseCase {
  constructor(private readonly repository: IAuditoryResearchRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'AuditoryResearch');
      Logger.info('Eliminando investigación auditiva', { id });
      
      await this.repository.delete(id);
      
      Logger.success('Investigación auditiva eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar investigación auditiva', { error: (error as Error).message });
      throw error;
    }
  }
}
