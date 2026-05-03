"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const usecases_1 = require("../../domain/usecases");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const repository = new database_1.DoctorRepository();
class DoctorController {
    static async create(req, res) {
        try {
            Logger_1.Logger.info('DoctorController.create - Solicitud recibida', { body: req.body });
            const data = dto_1.CreateDoctorSchema.parse(req.body);
            const useCase = new usecases_1.CreateDoctorUseCase(repository);
            const result = await useCase.execute({
                documentType: data.documentType,
                documentNumber: data.documentNumber,
                fullName: data.fullName,
                birthDate: new Date(data.birthDate),
                gender: data.gender,
                email: data.email,
                phone: data.phone,
                address: data.address,
            });
            Logger_1.Logger.success('DoctorController.create - Médico creado', { id: result.id });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('DoctorController.create - Error de validación Zod', { errors: error.errors });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('Ya existe')) {
                Logger_1.Logger.warning('DoctorController.create - Conflicto', { error: errorMessage });
                throw new errorHandler_1.ConflictAppError(errorMessage);
            }
            Logger_1.Logger.danger('DoctorController.create - Error interno', { error: errorMessage });
            throw error;
        }
    }
    static async findAll(req, res) {
        try {
            Logger_1.Logger.info('DoctorController.findAll - Solicitud recibida');
            const useCase = new usecases_1.GetAllDoctorsUseCase(repository);
            const result = await useCase.execute();
            Logger_1.Logger.success('DoctorController.findAll - Médicos obtenidos', { count: result.length });
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('DoctorController.findAll - Error', { error: error.message });
            throw error;
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorController.findById - Solicitud recibida', { id });
            const useCase = new usecases_1.GetDoctorByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                Logger_1.Logger.warning('DoctorController.findById - Médico no encontrado', { id });
                throw new errorHandler_1.NotFoundAppError(`Médico con ID ${id} no encontrado`);
            }
            Logger_1.Logger.success('DoctorController.findById - Médico obtenido', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorController.findById - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorController.findById - Error', { error: errorMessage });
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorController.update - Solicitud recibida', { id, body: req.body });
            const data = dto_1.UpdateDoctorSchema.parse(req.body);
            const useCase = new usecases_1.UpdateDoctorUseCase(repository);
            const transformedData = { ...data };
            if (data.birthDate) {
                transformedData.birthDate = new Date(data.birthDate);
            }
            const result = await useCase.execute(id, transformedData);
            Logger_1.Logger.success('DoctorController.update - Médico actualizado', { id });
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('DoctorController.update - Error de validación Zod', { errors: error.errors });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorController.update - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorController.update - Error', { error: errorMessage });
            throw error;
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorController.delete - Solicitud recibida', { id });
            const useCase = new usecases_1.DeleteDoctorUseCase(repository);
            await useCase.execute(id);
            Logger_1.Logger.success('DoctorController.delete - Médico eliminado', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorController.delete - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorController.delete - Error', { error: errorMessage });
            throw error;
        }
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=DoctorController.js.map