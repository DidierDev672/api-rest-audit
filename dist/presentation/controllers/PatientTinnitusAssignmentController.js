"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientTinnitusAssignmentController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const patientRepository = new database_1.PatientRepository();
const tinnitusRepository = new database_1.TinnitusQuestionnaireRepository();
const assignmentRepository = new database_1.PatientTinnitusAssignmentRepository();
class PatientTinnitusAssignmentController {
    static async assign(req, res) {
        try {
            Logger_1.Logger.info('Iniciando asignación de cuestionario tinnitus', { body: req.body });
            const data = dto_1.AssignTinnitusSchema.parse(req.body);
            const useCase = new usecases_1.CreateTinnitusAssignmentUseCase(assignmentRepository, patientRepository, tinnitusRepository);
            const result = await useCase.execute(data);
            Logger_1.Logger.success('Asignación creada', { id: result.id });
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.assign', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async getByPatient(req, res) {
        try {
            const { idPatient } = req.params;
            Logger_1.Logger.info('Obteniendo asignaciones por paciente', { idPatient });
            const schema = dto_1.CheckPatientTinnitusExistsSchema.parse({ idPatient });
            const useCase = new usecases_1.GetTinnitusAssignmentsByPatientUseCase(assignmentRepository);
            const result = await useCase.execute(schema.idPatient);
            Logger_1.Logger.success('Asignaciones obtenidas', { count: result.length });
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.getByPatient', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('Obteniendo asignación por ID', { id });
            const useCase = new usecases_1.GetTinnitusAssignmentByIdUseCase(assignmentRepository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Asignación no encontrada' });
                return;
            }
            Logger_1.Logger.success('Asignación obtenida', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.getById', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('Eliminando asignación', { id });
            const useCase = new usecases_1.DeleteTinnitusAssignmentUseCase(assignmentRepository);
            await useCase.execute(id);
            Logger_1.Logger.success('Asignación eliminada', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') ||
                errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.delete', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async deleteByPatient(req, res) {
        try {
            const { idPatient } = req.params;
            Logger_1.Logger.info('Eliminando todas las asignaciones del paciente', { idPatient });
            const schema = dto_1.CheckPatientTinnitusExistsSchema.parse({ idPatient });
            const useCase = new usecases_1.DeletePatientTinnitusAssignmentsUseCase(assignmentRepository);
            await useCase.execute(schema.idPatient);
            Logger_1.Logger.success('Asignaciones del paciente eliminadas', { idPatient });
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.deleteByPatient', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async validate(req, res) {
        try {
            Logger_1.Logger.info('Validando asignación', { body: req.body });
            const data = dto_1.ValidateTinnitusAssignmentSchema.parse(req.body);
            const useCase = new usecases_1.ValidateTinnitusAssignmentUseCase(patientRepository, tinnitusRepository);
            const result = await useCase.execute(data.idPatient, data.idTinnitusQuestionnaires);
            Logger_1.Logger.success('Validación completada', result);
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.validate', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async checkPatientExists(req, res) {
        try {
            const { idPatient } = req.params;
            Logger_1.Logger.info('Verificando existencia de paciente', { idPatient });
            const schema = dto_1.CheckPatientTinnitusExistsSchema.parse({ idPatient });
            const useCase = new usecases_1.CheckPatientTinnitusExistsUseCase(patientRepository);
            const exists = await useCase.execute(schema.idPatient);
            Logger_1.Logger.success('Verificación de paciente completada', { exists });
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.checkPatientExists', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async checkTinnitusExists(req, res) {
        try {
            const { idTinnitus } = req.params;
            Logger_1.Logger.info('Verificando existencia de cuestionario tinnitus', { idTinnitus });
            const schema = dto_1.CheckTinnitusExistsSchema.parse({ idTinnitusQuestionnaires: idTinnitus });
            const useCase = new usecases_1.CheckTinnitusExistsUseCase(tinnitusRepository);
            const exists = await useCase.execute(schema.idTinnitusQuestionnaires);
            Logger_1.Logger.success('Verificación de cuestionario completada', { exists });
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
            Logger_1.Logger.danger('Error en PatientTinnitusAssignmentController.checkTinnitusExists', {
                error: errorMessage,
            });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.PatientTinnitusAssignmentController = PatientTinnitusAssignmentController;
//# sourceMappingURL=PatientTinnitusAssignmentController.js.map