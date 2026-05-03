import { Request, Response } from 'express';
import { 
  CreatePatientUseCase, 
  GetAllPatientsUseCase, 
  GetPatientByIdUseCase,
  UpdatePatientUseCase,
  DeletePatientUseCase
} from '../../domain/usecases';
import { PatientRepository } from '../../infrastructure/database';
import { CreatePatientSchema, UpdatePatientSchema } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new PatientRepository();

export class PatientController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreatePatientSchema.parse(req.body);
      const useCase = new CreatePatientUseCase(repository);
      const result = await useCase.execute({
        ...data,
        birthDate: new Date(data.birthDate),
      });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Ya existe un paciente')) {
        res.status(409).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientController.create', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllPatientsUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en PatientController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetPatientByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Paciente no encontrado' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdatePatientSchema.parse(req.body);
      
      const transformedData: any = { ...data };
      if (data.birthDate) {
        transformedData.birthDate = new Date(data.birthDate);
      }
      
      const useCase = new UpdatePatientUseCase(repository);
      const result = await useCase.execute(id, transformedData);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeletePatientUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
