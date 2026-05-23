"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDocumentUploadController = void 0;
const zod_1 = require("zod");
const CreateAiDocumentUploadUseCase_1 = require("../../application/use-cases/CreateAiDocumentUploadUseCase");
const GetAiDocumentUploadUseCase_1 = require("../../application/use-cases/GetAiDocumentUploadUseCase");
const QueueAiDocumentAnalysisUseCase_1 = require("../../application/use-cases/QueueAiDocumentAnalysisUseCase");
const AiDocumentUploadRepository_1 = require("../../infrastructure/database/AiDocumentUploadRepository");
const PatientRepository_1 = require("../../infrastructure/database/PatientRepository");
const AiDocumentUploadDTO_1 = require("../dto/AiDocumentUploadDTO");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const Logger_1 = require("../../infrastructure/logger/Logger");
const uploadRepository = new AiDocumentUploadRepository_1.AiDocumentUploadRepository();
const patientRepository = new PatientRepository_1.PatientRepository();
const createUseCase = new CreateAiDocumentUploadUseCase_1.CreateAiDocumentUploadUseCase(uploadRepository, patientRepository);
const getUseCase = new GetAiDocumentUploadUseCase_1.GetAiDocumentUploadUseCase(uploadRepository);
const queueUseCase = new QueueAiDocumentAnalysisUseCase_1.QueueAiDocumentAnalysisUseCase(uploadRepository);
class AiDocumentUploadController {
    static async create(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({
                    status: 'error',
                    code: 'VALIDATION_ERROR',
                    message: 'El archivo es requerido (campo file)',
                });
                return;
            }
            const fields = AiDocumentUploadDTO_1.CreateAiDocumentUploadFieldsSchema.parse(req.body);
            const userId = req.user?.id ?? null;
            const result = await createUseCase.execute(req.file, fields, userId);
            res.status(201).json({
                status: 'success',
                message: 'Documento almacenado correctamente',
                data: result,
            });
        }
        catch (error) {
            AiDocumentUploadController.handleError(error, res, 'create');
        }
    }
    static async findAll(req, res) {
        try {
            const data = await getUseCase.findAll();
            res.json({ status: 'success', data });
        }
        catch (error) {
            AiDocumentUploadController.handleError(error, res, 'findAll');
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentUpload');
            const data = await getUseCase.findById(id);
            res.json({ status: 'success', data });
        }
        catch (error) {
            AiDocumentUploadController.handleError(error, res, 'findById');
        }
    }
    static async queueAnalysis(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'AiDocumentUpload');
            const data = await queueUseCase.execute(id);
            res.status(201).json({
                status: 'success',
                message: 'Análisis encolado',
                data,
            });
        }
        catch (error) {
            AiDocumentUploadController.handleError(error, res, 'queueAnalysis');
        }
    }
    static handleError(error, res, action) {
        if (error instanceof zod_1.ZodError) {
            const first = error.errors[0];
            res.status(400).json({
                status: 'error',
                code: 'VALIDATION_ERROR',
                message: first.message,
                details: { field: first.path.join('.') },
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
        Logger_1.Logger.danger(`Error en AiDocumentUploadController.${action}`, {
            error: error.message,
        });
        res.status(500).json({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: error.message,
        });
    }
}
exports.AiDocumentUploadController = AiDocumentUploadController;
//# sourceMappingURL=AiDocumentUploadController.js.map