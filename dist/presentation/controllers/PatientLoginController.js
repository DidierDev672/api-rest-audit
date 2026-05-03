"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientLoginController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.PatientLoginRepository();
class PatientLoginController {
    static async register(req, res) {
        try {
            const data = dto_1.RegisterPatientLoginSchema.parse(req.body);
            const useCase = new usecases_1.RegisterPatientLoginUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('Ya existe una cuenta con este email') ||
                errorMessage.includes('Ya existe una cuenta con este nombre de usuario')) {
                res.status(409).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientLoginController.register', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async login(req, res) {
        try {
            const data = dto_1.LoginSchema.parse(req.body);
            const useCase = new usecases_1.LoginPatientUseCase(repository);
            const result = await useCase.execute(data);
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('Credenciales inválidas')) {
                res.status(401).json({ error: errorMessage });
                return;
            }
            if (errorMessage.includes('Email o nombre de usuario son requeridos')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientLoginController.login', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async logout(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Token requerido' });
                return;
            }
            const token = authHeader.substring(7);
            const useCase = new usecases_1.LogoutPatientUseCase(repository);
            await useCase.execute(token);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('Token inválido')) {
                res.status(401).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientLoginController.logout', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async validateToken(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Token requerido' });
                return;
            }
            const token = authHeader.substring(7);
            const useCase = new usecases_1.ValidateTokenUseCase(repository);
            const result = await useCase.execute(token);
            if (!result) {
                res.status(401).json({ error: 'Token inválido o expirado' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en PatientLoginController.validateToken', {
                error: error.message,
            });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.PatientLoginController = PatientLoginController;
//# sourceMappingURL=PatientLoginController.js.map