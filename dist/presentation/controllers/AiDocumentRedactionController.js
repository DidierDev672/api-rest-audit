"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDocumentRedactionController = void 0;
const CreateAiDocumentRedactionUseCase_1 = require("../../application/use-cases/CreateAiDocumentRedactionUseCase");
const GetAiDocumentRedactionUseCase_1 = require("../../application/use-cases/GetAiDocumentRedactionUseCase");
const UpdateAiDocumentRedactionUseCase_1 = require("../../application/use-cases/UpdateAiDocumentRedactionUseCase");
const DeleteAiDocumentRedactionUseCase_1 = require("../../application/use-cases/DeleteAiDocumentRedactionUseCase");
const AiDocumentRedactionRepository_1 = require("../../infrastructure/database/AiDocumentRedactionRepository");
const AiDocumentRedactionDTO_1 = require("../dto/AiDocumentRedactionDTO");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new AiDocumentRedactionRepository_1.AiDocumentRedactionRepository();
const createUseCase = new CreateAiDocumentRedactionUseCase_1.CreateAiDocumentRedactionUseCase(repository);
const getUseCase = new GetAiDocumentRedactionUseCase_1.GetAiDocumentRedactionUseCase(repository);
const updateUseCase = new UpdateAiDocumentRedactionUseCase_1.UpdateAiDocumentRedactionUseCase(repository);
const deleteUseCase = new DeleteAiDocumentRedactionUseCase_1.DeleteAiDocumentRedactionUseCase(repository);
class AiDocumentRedactionController {
    static async create(req, res) {
        try {
            const data = AiDocumentRedactionDTO_1.CreateAiDocumentRedactionSchema.parse(req.body);
            const result = await createUseCase.execute(data);
            res.status(201).json({
                status: 'success',
                message: 'Redacción guardada correctamente',
                data: result,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const firstError = error.errors[0];
                res.status(400).json({
                    status: 'error',
                    code: 'VALIDATION_ERROR',
                    message: firstError.message,
                    details: { field: firstError.path.join('.') },
                });
                return;
            }
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({
                    status: 'error',
                    code: 'APP_ERROR',
                    message: error.message,
                });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.create', { error: error.message });
            res.status(500).json({
                status: 'error',
                code: 'INTERNAL_ERROR',
                message: error.message,
            });
        }
    }
    static async findAll(req, res) {
        try {
            const redactions = await getUseCase.findAll();
            res.json({
                status: 'success',
                data: redactions,
            });
        }
        catch (error) {
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentRedaction');
            const redaction = await getUseCase.findById(id);
            res.json({
                status: 'success',
                data: redaction,
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.findById', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findByDocumentUploadId(req, res) {
        try {
            const { documentUploadId } = req.params;
            IdValidator_1.IdValidator.validate(documentUploadId, 'DocumentUpload');
            const redactions = await getUseCase.findByDocumentUploadId(documentUploadId);
            res.json({
                status: 'success',
                data: redactions,
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.findByDocumentUploadId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentRedaction');
            const data = AiDocumentRedactionDTO_1.UpdateAiDocumentRedactionSchema.parse(req.body);
            const updated = await updateUseCase.execute(id, data);
            res.json({
                status: 'success',
                message: 'Redacción actualizada correctamente',
                data: updated,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const firstError = error.errors[0];
                res.status(400).json({
                    status: 'error',
                    code: 'VALIDATION_ERROR',
                    message: firstError.message,
                    details: { field: firstError.path.join('.') },
                });
                return;
            }
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({
                    status: 'error',
                    code: 'APP_ERROR',
                    message: error.message,
                });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.update', { error: error.message });
            res.status(500).json({
                status: 'error',
                code: 'INTERNAL_ERROR',
                message: error.message,
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentRedaction');
            await deleteUseCase.execute(id);
            res.json({
                status: 'success',
                message: 'Redacción eliminada correctamente',
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({
                    status: 'error',
                    code: 'APP_ERROR',
                    message: error.message,
                });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentRedactionController.delete', { error: error.message });
            res.status(500).json({
                status: 'error',
                code: 'INTERNAL_ERROR',
                message: error.message,
            });
        }
    }
}
exports.AiDocumentRedactionController = AiDocumentRedactionController;
//# sourceMappingURL=AiDocumentRedactionController.js.map