import { Request, Response } from 'express';
import {
  RegisterPatientLoginUseCase,
  LoginPatientUseCase,
  LogoutPatientUseCase,
  ValidateTokenUseCase,
} from '../../domain/usecases';
import { PatientLoginRepository } from '../../infrastructure/database';
import { RegisterPatientLoginSchema, LoginSchema, TokenSchema } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new PatientLoginRepository();

export class PatientLoginController {
  static async register(req: Request, res: Response) {
    try {
      const data = RegisterPatientLoginSchema.parse(req.body);
      const useCase = new RegisterPatientLoginUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('Ya existe una cuenta con este email') ||
        errorMessage.includes('Ya existe una cuenta con este nombre de usuario')
      ) {
        res.status(409).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientLoginController.register', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data = LoginSchema.parse(req.body);
      const useCase = new LoginPatientUseCase(repository);
      const result = await useCase.execute(data);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Credenciales inválidas')) {
        res.status(401).json({ error: errorMessage });
        return;
      }
      if (errorMessage.includes('Email o nombre de usuario son requeridos')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientLoginController.login', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token requerido' });
        return;
      }
      const token = authHeader.substring(7);
      const useCase = new LogoutPatientUseCase(repository);
      await useCase.execute(token);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Token inválido')) {
        res.status(401).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientLoginController.logout', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async validateToken(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token requerido' });
        return;
      }
      const token = authHeader.substring(7);
      const useCase = new ValidateTokenUseCase(repository);
      const result = await useCase.execute(token);

      if (!result) {
        res.status(401).json({ error: 'Token inválido o expirado' });
        return;
      }

      res.json(result);
    } catch (error) {
      Logger.danger('Error en PatientLoginController.validateToken', {
        error: (error as Error).message,
      });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
