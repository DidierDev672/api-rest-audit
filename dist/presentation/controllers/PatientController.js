"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const usecases_1 = require("../../domain/usecases");
const SearchPatientsByNameUseCase_1 = require("../../application/use-cases/SearchPatientsByNameUseCase");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.PatientRepository();
class PatientController {
    static async create(req, res) {
        try {
            const data = dto_1.CreatePatientSchema.parse(req.body);
            const useCase = new usecases_1.CreatePatientUseCase(repository);
            const result = await useCase.execute({
                ...data,
                birthDate: new Date(data.birthDate),
            });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('Ya existe un paciente')) {
                res.status(409).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientController.create', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async searchByName(req, res) {
        try {
            const name = String(req.query.name ?? '');
            const useCase = new SearchPatientsByNameUseCase_1.SearchPatientsByNameUseCase(repository);
            const result = await useCase.execute(name);
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en PatientController.searchByName', {
                error: error.message,
            });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const useCase = new usecases_1.GetAllPatientsUseCase(repository);
            const result = await useCase.execute();
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en PatientController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetPatientByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdatePatientSchema.parse(req.body);
            const transformedData = { ...data };
            if (data.birthDate) {
                transformedData.birthDate = new Date(data.birthDate);
            }
            const useCase = new usecases_1.UpdatePatientUseCase(repository);
            const result = await useCase.execute(id, transformedData);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeletePatientUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=PatientController.js.map