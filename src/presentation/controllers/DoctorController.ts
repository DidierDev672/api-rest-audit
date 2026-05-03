import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import { DoctorRepository } from '../../infrastructure/database';
import { CreateDoctorSchema, UpdateDoctorSchema } from '../dto';
import {
  CreateDoctorUseCase,
  GetAllDoctorsUseCase,
  GetDoctorByIdUseCase,
  UpdateDoctorUseCase,
  DeleteDoctorUseCase,
} from '../../domain/usecases';
import { NotFoundAppError, ValidationAppError, ConflictAppError } from '../../infrastructure/middleware/errorHandler';
import { DoctorDocumentType } from '../../domain/entities';

const repository = new DoctorRepository();

export class DoctorController {
  static async create(req: Request, res: Response) {
    try {
      Logger.info('DoctorController.create - Solicitud recibida', { body: req.body });

      const data = CreateDoctorSchema.parse(req.body);
      const useCase = new CreateDoctorUseCase(repository);
      const result = await useCase.execute({
        documentType: data.documentType as DoctorDocumentType,
        documentNumber: data.documentNumber,
        fullName: data.fullName,
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

      Logger.success('DoctorController.create - Médico creado', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('DoctorController.create - Error de validación Zod', { errors: error.errors });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Ya existe')) {
        Logger.warning('DoctorController.create - Conflicto', { error: errorMessage });
        throw new ConflictAppError(errorMessage);
      }

      Logger.danger('DoctorController.create - Error interno', { error: errorMessage });
      throw error;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      Logger.info('DoctorController.findAll - Solicitud recibida');

      const useCase = new GetAllDoctorsUseCase(repository);
      const result = await useCase.execute();

      Logger.success('DoctorController.findAll - Médicos obtenidos', { count: result.length });
      res.json(result);
    } catch (error) {
      Logger.danger('DoctorController.findAll - Error', { error: (error as Error).message });
      throw error;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorController.findById - Solicitud recibida', { id });

      const useCase = new GetDoctorByIdUseCase(repository);
      const result = await useCase.execute(id);

      if (!result) {
        Logger.warning('DoctorController.findById - Médico no encontrado', { id });
        throw new NotFoundAppError(`Médico con ID ${id} no encontrado`);
      }

      Logger.success('DoctorController.findById - Médico obtenido', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorController.findById - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorController.findById - Error', { error: errorMessage });
      throw error;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorController.update - Solicitud recibida', { id, body: req.body });

      const data = UpdateDoctorSchema.parse(req.body);
      const useCase = new UpdateDoctorUseCase(repository);

      const transformedData: any = { ...data };
      if (data.birthDate) {
        transformedData.birthDate = new Date(data.birthDate);
      }

      const result = await useCase.execute(id, transformedData);

      Logger.success('DoctorController.update - Médico actualizado', { id });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('DoctorController.update - Error de validación Zod', { errors: error.errors });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorController.update - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorController.update - Error', { error: errorMessage });
      throw error;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorController.delete - Solicitud recibida', { id });

      const useCase = new DeleteDoctorUseCase(repository);
      await useCase.execute(id);

      Logger.success('DoctorController.delete - Médico eliminado', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorController.delete - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorController.delete - Error', { error: errorMessage });
      throw error;
    }
  }
}
