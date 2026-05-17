"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNoteAnalysisController = void 0;
const CreateResearchNoteAnalysisUseCase_1 = require("../../application/use-cases/CreateResearchNoteAnalysisUseCase");
const ResearchNoteAnalysisRepository_1 = require("../../infrastructure/database/ResearchNoteAnalysisRepository");
const AuditoryResearchRepository_1 = require("../../infrastructure/database/AuditoryResearchRepository");
const dto_1 = require("../dto");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new ResearchNoteAnalysisRepository_1.ResearchNoteAnalysisRepository();
const auditoryResearchRepository = new AuditoryResearchRepository_1.AuditoryResearchRepository();
class ResearchNoteAnalysisController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateResearchNoteAnalysisSchema.parse(req.body);
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    status: 'error',
                    code: 'UNAUTHORIZED',
                    message: 'Usuario no autenticado',
                });
                return;
            }
            const useCase = new CreateResearchNoteAnalysisUseCase_1.CreateResearchNoteAnalysisUseCase(repository, auditoryResearchRepository);
            const result = await useCase.execute(data, userId);
            res.status(201).json({
                status: 'success',
                message: 'Analisis guardado correctamente',
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
            Logger_1.Logger.danger('Error en ResearchNoteAnalysisController.create', { error: error.message });
            res.status(500).json({
                status: 'error',
                code: 'INTERNAL_ERROR',
                message: error.message,
            });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'Analysis');
            const analysis = await repository.findById(id);
            if (!analysis) {
                throw new errorHandler_1.AppError(`Análisis con ID ${id} no encontrado`, 404);
            }
            res.json(analysis);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en ResearchNoteAnalysisController.findById', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findByResearchId(req, res) {
        try {
            const { researchId } = req.params;
            IdValidator_1.IdValidator.validate(researchId, 'Investigación');
            const research = await auditoryResearchRepository.findById(researchId);
            if (!research) {
                throw new errorHandler_1.AppError(`Investigación con ID ${researchId} no encontrada`, 404);
            }
            const analyses = await repository.findByResearchId(researchId);
            res.json(analyses);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            if (error instanceof errorHandler_1.AppError) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            Logger_1.Logger.danger('Error en ResearchNoteAnalysisController.findByResearchId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ResearchNoteAnalysisController = ResearchNoteAnalysisController;
//# sourceMappingURL=ResearchNoteAnalysisController.js.map