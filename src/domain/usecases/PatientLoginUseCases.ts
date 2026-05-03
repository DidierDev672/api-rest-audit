import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { IPatientLoginRepository, CreatePatientLoginData } from '../repositories';
import { PatientLogin, PermitRole } from '../entities';
import { Logger } from '../../infrastructure/logger/Logger';
import { AppError } from '../../infrastructure/middleware/errorHandler';

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 100000;

export interface RegisterPatientLoginData {
  idPatient: string;
  email: string;
  username: string;
  password: string;
  permits?: PermitRole[];
  hasConsent: boolean;
}

export interface LoginData {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResult {
  patientLogin: Omit<PatientLogin, 'password'>;
  token: string;
}

export class RegisterPatientLoginUseCase {
  constructor(private readonly repository: IPatientLoginRepository) {}

  async execute(data: RegisterPatientLoginData): Promise<Omit<PatientLogin, 'password'>> {
    try {
      Logger.info('Registrando login de paciente', { email: data.email, username: data.username });

      if (!data.hasConsent) {
        throw new AppError('El consentimiento es mandatorio para la permanencia de la integridad digital', 403);
      }

      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail) {
        throw new AppError('Ya existe una cuenta con este email', 409);
      }

      const existingByUsername = await this.repository.findByUsername(data.username);
      if (existingByUsername) {
        throw new AppError('Ya existe una cuenta con este nombre de usuario', 409);
      }

      const hashedPassword = this.hashPassword(data.password);
      const permits: PermitRole[] = data.permits && data.permits.length > 0 ? data.permits : ['patient'];

      const createData: CreatePatientLoginData = {
        idPatient: data.idPatient,
        email: data.email,
        username: data.username,
        password: hashedPassword,
        permits,
        hasConsent: data.hasConsent,
      };

      const result = await this.repository.create(createData);

      const { password: _, ...patientLoginWithoutPassword } = result;
      Logger.success('Login de paciente registrado exitosamente', { id: result.id });
      return patientLoginWithoutPassword;
    } catch (error) {
      if (error instanceof AppError) throw error;
      Logger.danger('Error al registrar login de paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private hashPassword(password: string): string {
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512')
      .toString('hex');
    return `${salt}:${hash}`;
  }
}

export class LoginPatientUseCase {
  constructor(private readonly repository: IPatientLoginRepository) {}

  async execute(data: LoginData): Promise<LoginResult> {
    try {
      Logger.info('Intento de login de paciente', {
        email: data.email,
        username: data.username,
      });

      if (!data.email && !data.username) {
        throw new Error('Email o nombre de usuario son requeridos');
      }

      let patientLogin: PatientLogin | null = null;

      if (data.email) {
        patientLogin = await this.repository.findByEmail(data.email);
      } else if (data.username) {
        patientLogin = await this.repository.findByUsername(data.username);
      }

      if (!patientLogin) {
        Logger.warning('Login fallido: usuario no encontrado', {
          email: data.email,
          username: data.username,
        });
        throw new Error('Credenciales inválidas');
      }

      const isValidPassword = this.verifyPassword(data.password, patientLogin.password);
      if (!isValidPassword) {
        Logger.warning('Login fallido: contraseña incorrecta', {
          email: data.email,
          username: data.username,
        });
        throw new Error('Credenciales inválidas');
      }

      const token = this.generateToken();
      await this.repository.updateToken(patientLogin.id, token);

      const { password: _, ...patientLoginWithoutPassword } = patientLogin;

      Logger.success('Login exitoso', { id: patientLogin.id });
      return {
        patientLogin: patientLoginWithoutPassword,
        token,
      };
    } catch (error) {
      Logger.danger('Error en login de paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  private verifyPassword(password: string, storedPassword: string): boolean {
    const [salt, hash] = storedPassword.split(':');
    const verifyHash = crypto
      .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512')
      .toString('hex');
    return hash === verifyHash;
  }

  private generateToken(): string {
    return uuidv4() + '-' + crypto.randomBytes(32).toString('hex');
  }
}

export class LogoutPatientUseCase {
  constructor(private readonly repository: IPatientLoginRepository) {}

  async execute(token: string): Promise<void> {
    try {
      Logger.info('Logout de paciente', { token });

      const patientLogin = await this.repository.findByToken(token);
      if (!patientLogin) {
        throw new Error('Token inválido');
      }

      await this.repository.clearToken(patientLogin.id);
      Logger.success('Logout exitoso', { id: patientLogin.id });
    } catch (error) {
      Logger.danger('Error en logout de paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class ValidateTokenUseCase {
  constructor(private readonly repository: IPatientLoginRepository) {}

  async execute(token: string): Promise<Omit<PatientLogin, 'password'> | null> {
    try {
      const patientLogin = await this.repository.findByToken(token);
      if (!patientLogin) {
        return null;
      }

      const { password: _, ...patientLoginWithoutPassword } = patientLogin;
      return patientLoginWithoutPassword;
    } catch (error) {
      Logger.danger('Error al validar token', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
