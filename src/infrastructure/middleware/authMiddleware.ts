import { Request, Response, NextFunction } from 'express';
import { PatientLoginRepository } from '../database';
import { Logger } from '../logger/Logger';

export interface AuthenticatedUser {
  id: string;
  idPatient: string;
  email: string;
  permits: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    Logger.warning('Auth middleware - Token requerido');
    res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Token de autenticación requerido',
    });
    return;
  }

  const token = authHeader.substring(7);
  const repository = new PatientLoginRepository();

  try {
    const user = await repository.findByToken(token);

    if (!user) {
      Logger.warning('Auth middleware - Token inválido');
      res.status(401).json({
        status: 'error',
        code: 'UNAUTHORIZED',
        message: 'Token inválido o expirado',
      });
      return;
    }

    req.user = {
      id: user.id,
      idPatient: user.idPatient,
      email: user.email,
      permits: user.permits,
    };

    next();
  } catch (error) {
    Logger.danger('Auth middleware - Error interno', { error: (error as Error).message });
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: 'Error al validar autenticación',
    });
  }
};
