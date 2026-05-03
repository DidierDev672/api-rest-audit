"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientScreeningAssignmentController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const patientRepository = new database_1.PatientRepository();
const screeningRepository = new database_1.ScreeningRepository();
const assignmentRepository = new database_1.PatientScreeningAssignmentRepository();
class PatientScreeningAssignmentController {
    static async assign(req, res) {
        try {
            const data = dto_1.AssignScreeningsSchema.parse(req.body);
            const useCase = new usecases_1.CreateAssignmentUseCase(assignmentRepository, patientRepository, screeningRepository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('no existe') ||
                errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.assign', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async getByPatient(req, res) {
        try {
            const { patientId } = req.params;
            const schema = dto_1.CheckPatientScreeningExistsSchema.parse({ patientId });
            const useCase = new usecases_1.GetAssignmentsByPatientUseCase(assignmentRepository);
            const result = await useCase.execute(schema.patientId);
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.getByPatient', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetAssignmentByIdUseCase(assignmentRepository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Asignación no encontrada' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.getById', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteAssignmentUseCase(assignmentRepository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.delete', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async deleteByPatient(req, res) {
        try {
            const { patientId } = req.params;
            const schema = dto_1.CheckPatientScreeningExistsSchema.parse({ patientId });
            const useCase = new usecases_1.DeletePatientAssignmentsUseCase(assignmentRepository);
            await useCase.execute(schema.patientId);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.deleteByPatient', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async validate(req, res) {
        try {
            const data = dto_1.ValidateAssignmentSchema.parse(req.body);
            const useCase = new usecases_1.ValidateAssignmentUseCase(patientRepository, screeningRepository);
            const result = await useCase.execute(data.patientId, data.screeningIds);
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.validate', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async checkPatientExists(req, res) {
        try {
            const { patientId } = req.params;
            const schema = dto_1.CheckPatientScreeningExistsSchema.parse({ patientId });
            const useCase = new usecases_1.CheckPatientExistsUseCase(patientRepository);
            const exists = await useCase.execute(schema.patientId);
            res.json({ exists });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.checkPatientExists', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async checkScreeningExists(req, res) {
        try {
            const { screeningId } = req.params;
            const schema = dto_1.CheckScreeningExistsSchema.parse({ screeningId });
            const useCase = new usecases_1.CheckScreeningExistsUseCase(screeningRepository);
            const exists = await useCase.execute(schema.screeningId);
            res.json({ exists });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientScreeningAssignmentController.checkScreeningExists', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.PatientScreeningAssignmentController = PatientScreeningAssignmentController;
//# sourceMappingURL=PatientScreeningAssignmentController.js.map