import { Logger } from '../../infrastructure/logger/Logger';
import { AppError } from '../middleware/errorHandler';
import { ZodError } from 'zod';

export class IdValidator {
  static validate(id: string, entityName: string): void {
    if (!id || id.trim() === '') {
      Logger.warning(`ID requerido para ${entityName}`, { id });
      throw new AppError(`El ID de ${entityName} es requerido`, 400);
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id.trim())) {
      Logger.warning(`ID inválido para ${entityName}`, { id });
      throw new AppError(`El ID proporcionado para ${entityName} no es válido`, 400);
    }
  }

  static validateOptional(id: string | undefined, entityName: string): void {
    if (id && id.trim() !== '') {
      this.validate(id, entityName);
    }
  }
}

export class RequestValidator {
  static validateDTO<T>(schema: any, data: T, entityName: string): void {
    try {
      schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning(`Validación fallida para ${entityName}`, { errors: error.errors });
        throw new AppError(`Datos inválidos para ${entityName}: ${JSON.stringify(error.errors)}`, 400);
      }
      throw error;
    }
  }
}
