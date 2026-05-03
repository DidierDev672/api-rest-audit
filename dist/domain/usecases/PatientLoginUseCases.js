"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenUseCase = exports.LogoutPatientUseCase = exports.LoginPatientUseCase = exports.RegisterPatientLoginUseCase = void 0;
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
const Logger_1 = require("../../infrastructure/logger/Logger");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 100000;
class RegisterPatientLoginUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Registrando login de paciente', { email: data.email, username: data.username });
            if (!data.hasConsent) {
                throw new errorHandler_1.AppError('El consentimiento es mandatorio para la permanencia de la integridad digital', 403);
            }
            const existingByEmail = await this.repository.findByEmail(data.email);
            if (existingByEmail) {
                throw new errorHandler_1.AppError('Ya existe una cuenta con este email', 409);
            }
            const existingByUsername = await this.repository.findByUsername(data.username);
            if (existingByUsername) {
                throw new errorHandler_1.AppError('Ya existe una cuenta con este nombre de usuario', 409);
            }
            const hashedPassword = this.hashPassword(data.password);
            const permits = data.permits && data.permits.length > 0 ? data.permits : ['patient'];
            const createData = {
                idPatient: data.idPatient,
                email: data.email,
                username: data.username,
                password: hashedPassword,
                permits,
                hasConsent: data.hasConsent,
            };
            const result = await this.repository.create(createData);
            const { password: _, ...patientLoginWithoutPassword } = result;
            Logger_1.Logger.success('Login de paciente registrado exitosamente', { id: result.id });
            return patientLoginWithoutPassword;
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError)
                throw error;
            Logger_1.Logger.danger('Error al registrar login de paciente', {
                error: error.message,
            });
            throw error;
        }
    }
    hashPassword(password) {
        const salt = crypto_1.default.randomBytes(SALT_LENGTH).toString('hex');
        const hash = crypto_1.default
            .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512')
            .toString('hex');
        return `${salt}:${hash}`;
    }
}
exports.RegisterPatientLoginUseCase = RegisterPatientLoginUseCase;
class LoginPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Intento de login de paciente', {
                email: data.email,
                username: data.username,
            });
            if (!data.email && !data.username) {
                throw new Error('Email o nombre de usuario son requeridos');
            }
            let patientLogin = null;
            if (data.email) {
                patientLogin = await this.repository.findByEmail(data.email);
            }
            else if (data.username) {
                patientLogin = await this.repository.findByUsername(data.username);
            }
            if (!patientLogin) {
                Logger_1.Logger.warning('Login fallido: usuario no encontrado', {
                    email: data.email,
                    username: data.username,
                });
                throw new Error('Credenciales inválidas');
            }
            const isValidPassword = this.verifyPassword(data.password, patientLogin.password);
            if (!isValidPassword) {
                Logger_1.Logger.warning('Login fallido: contraseña incorrecta', {
                    email: data.email,
                    username: data.username,
                });
                throw new Error('Credenciales inválidas');
            }
            const token = this.generateToken();
            await this.repository.updateToken(patientLogin.id, token);
            const { password: _, ...patientLoginWithoutPassword } = patientLogin;
            Logger_1.Logger.success('Login exitoso', { id: patientLogin.id });
            return {
                patientLogin: patientLoginWithoutPassword,
                token,
            };
        }
        catch (error) {
            Logger_1.Logger.danger('Error en login de paciente', {
                error: error.message,
            });
            throw error;
        }
    }
    verifyPassword(password, storedPassword) {
        const [salt, hash] = storedPassword.split(':');
        const verifyHash = crypto_1.default
            .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512')
            .toString('hex');
        return hash === verifyHash;
    }
    generateToken() {
        return (0, uuid_1.v4)() + '-' + crypto_1.default.randomBytes(32).toString('hex');
    }
}
exports.LoginPatientUseCase = LoginPatientUseCase;
class LogoutPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(token) {
        try {
            Logger_1.Logger.info('Logout de paciente', { token });
            const patientLogin = await this.repository.findByToken(token);
            if (!patientLogin) {
                throw new Error('Token inválido');
            }
            await this.repository.clearToken(patientLogin.id);
            Logger_1.Logger.success('Logout exitoso', { id: patientLogin.id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error en logout de paciente', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.LogoutPatientUseCase = LogoutPatientUseCase;
class ValidateTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(token) {
        try {
            const patientLogin = await this.repository.findByToken(token);
            if (!patientLogin) {
                return null;
            }
            const { password: _, ...patientLoginWithoutPassword } = patientLogin;
            return patientLoginWithoutPassword;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al validar token', {
                error: error.message,
            });
            throw error;
        }
    }
}
exports.ValidateTokenUseCase = ValidateTokenUseCase;
//# sourceMappingURL=PatientLoginUseCases.js.map