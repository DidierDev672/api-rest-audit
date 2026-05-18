import { Request, Response, NextFunction } from 'express';
import { Logger } from '../logger/Logger';
import { ZodError } from 'zod';
import { N8nIntegrationError } from '../../domain/errors/N8nIntegrationError';
import { ValidationError } from '../../domain/errors/ValidationError';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export class ValidationAppError extends AppError {
  errors: any[];

  constructor(message: string, errors: any[]) {
    super(message, 400);
    this.name = 'ValidationAppError';
    this.errors = errors;
  }
}

export class NotFoundAppError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundAppError';
  }
}

export class ConflictAppError extends AppError {
  constructor(message: string) {
    super(message, 409);
    this.name = 'ConflictAppError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  Logger.danger('Error capturado por middleware', {
    name: err.name,
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof N8nIntegrationError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ValidationAppError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.errors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Error de validación',
      details: err.errors,
    });
    return;
  }

  res.status(500).json({
    error: 'Error interno del servidor',
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  Logger.warning('Ruta no encontrada', { path: req.path, method: req.method });
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
  });
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Logger.info(`Solicitud recibida`, {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
  });
  next();
};
