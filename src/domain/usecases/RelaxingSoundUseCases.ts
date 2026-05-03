import { RelaxingSound } from '../entities';
import { IRelaxingSoundRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateRelaxingSoundUseCase {
  constructor(private readonly repository: IRelaxingSoundRepository) {}

  async execute(data: { title: string; description: string; sound: string }): Promise<RelaxingSound> {
    try {
      Logger.info('Creando sonido relajante', { title: data.title });
      
      const result = await this.repository.create(data);
      
      Logger.success('Sonido relajante creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear sonido relajante', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllRelaxingSoundsUseCase {
  constructor(private readonly repository: IRelaxingSoundRepository) {}

  async execute(): Promise<RelaxingSound[]> {
    try {
      Logger.info('Obteniendo todos los sonidos relajantes');
      
      const result = await this.repository.findAll();
      
      Logger.success('Sonidos relajantes obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener sonidos relajantes', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetRelaxingSoundByIdUseCase {
  constructor(private readonly repository: IRelaxingSoundRepository) {}

  async execute(id: string): Promise<RelaxingSound | null> {
    try {
      IdValidator.validate(id, 'RelaxingSound');
      Logger.info('Obteniendo sonido relajante por ID', { id });
      
      const result = await this.repository.findById(id);
      
      if (!result) {
        Logger.warning('Sonido relajante no encontrado', { id });
        return null;
      }
      
      Logger.success('Sonido relajante obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener sonido relajante por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateRelaxingSoundUseCase {
  constructor(private readonly repository: IRelaxingSoundRepository) {}

  async execute(id: string, data: Partial<RelaxingSound>): Promise<RelaxingSound> {
    try {
      IdValidator.validate(id, 'RelaxingSound');
      Logger.info('Actualizando sonido relajante', { id });
      
      const result = await this.repository.update(id, data);
      
      Logger.success('Sonido relajante actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar sonido relajante', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteRelaxingSoundUseCase {
  constructor(private readonly repository: IRelaxingSoundRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'RelaxingSound');
      Logger.info('Eliminando sonido relajante', { id });
      
      await this.repository.delete(id);
      
      Logger.success('Sonido relajante eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar sonido relajante', { error: (error as Error).message });
      throw error;
    }
  }
}
