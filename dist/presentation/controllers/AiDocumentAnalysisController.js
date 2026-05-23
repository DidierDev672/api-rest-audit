"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDocumentAnalysisController = void 0;
const CreateAiDocumentAnalysisUseCase_1 = require("../../application/use-cases/CreateAiDocumentAnalysisUseCase");
const GetAiDocumentAnalysisUseCase_1 = require("../../application/use-cases/GetAiDocumentAnalysisUseCase");
const AiDocumentAnalysisRepository_1 = require("../../infrastructure/database/AiDocumentAnalysisRepository");
const AiDocumentAnalysisDTO_1 = require("../dto/AiDocumentAnalysisDTO");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new AiDocumentAnalysisRepository_1.AiDocumentAnalysisRepository();
const createUseCase = new CreateAiDocumentAnalysisUseCase_1.CreateAiDocumentAnalysisUseCase(repository);
const getUseCase = new GetAiDocumentAnalysisUseCase_1.GetAiDocumentAnalysisUseCase(repository);
class AiDocumentAnalysisController {
    static async create(req, res) {
        try {
            const data = AiDocumentAnalysisDTO_1.CreateAiDocumentAnalysisSchema.parse(req.body);
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    status: 'error',
                    code: 'UNAUTHORIZED',
                    message: 'Usuario no autenticado',
                });
                return;
            }
            const result = await createUseCase.execute(data, userId);
            res.status(201).json({
                status: 'success',
                message: 'Análisis guardado correctamente',
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
                    details: {
                        field: firstError.path.join('.'),
                    },
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
            Logger_1.Logger.danger('Error en AiDocumentAnalysisController.create', { error: error.message });
            res.status(500).json({
                status: 'error',
                code: 'INTERNAL_ERROR',
                message: error.message,
            });
        }
    }
    static async findAll(req, res) {
        try {
            const analyses = await getUseCase.findAll();
            res.json({
                status: 'success',
                data: analyses,
            });
        }
        catch (error) {
            Logger_1.Logger.danger('Error en AiDocumentAnalysisController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentAnalysis');
            const analysis = await getUseCase.findById(id);
            res.json({
                status: 'success',
                data: analysis,
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentAnalysisController.findById', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findByDocumentUploadId(req, res) {
        try {
            const { documentUploadId } = req.params;
            IdValidator_1.IdValidator.validate(documentUploadId, 'DocumentUpload');
            const analyses = await getUseCase.findByDocumentUploadId(documentUploadId);
            res.json({
                status: 'success',
                data: analyses,
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en AiDocumentAnalysisController.findByDocumentUploadId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.AiDocumentAnalysisController = AiDocumentAnalysisController;
//# sourceMappingURL=AiDocumentAnalysisController.js.map