"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchAnalysisController = void 0;
const CreateResearchAnalysisUseCase_1 = require("../../application/use-cases/CreateResearchAnalysisUseCase");
const database_1 = require("../../infrastructure/database");
const AuditoryResearchRepository_1 = require("../../infrastructure/database/AuditoryResearchRepository");
const dto_1 = require("../dto");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.ResearchAnalysisRepository();
const auditoryResearchRepository = new AuditoryResearchRepository_1.AuditoryResearchRepository();
class ResearchAnalysisController {
    static async findAll(req, res) {
        try {
            const analyses = await repository.findAll();
            res.json(analyses);
        }
        catch (error) {
            Logger_1.Logger.danger('Error in ResearchAnalysisController.findAll', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const data = dto_1.CreateResearchAnalysisSchema.parse(req.body);
            const useCase = new CreateResearchAnalysisUseCase_1.CreateResearchAnalysisUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error in ResearchAnalysisController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'Analysis');
            const analysis = await repository.findById(id);
            if (!analysis) {
                throw new errorHandler_1.AppError(`Analysis with ID ${id} not found`, 404);
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
            Logger_1.Logger.danger('Error in ResearchAnalysisController.findById', { error: error.message });
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
            Logger_1.Logger.danger('Error in ResearchAnalysisController.findByResearchId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'Analysis');
            const data = dto_1.CreateResearchAnalysisSchema.partial().parse(req.body);
            const updated = await repository.update(id, data);
            res.json(updated);
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
            Logger_1.Logger.danger('Error in ResearchAnalysisController.update', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            IdValidator_1.IdValidator.validate(id, 'Analysis');
            await repository.delete(id);
            res.status(204).send();
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
            Logger_1.Logger.danger('Error in ResearchAnalysisController.delete', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async deleteByResearchId(req, res) {
        try {
            const { researchId } = req.params;
            IdValidator_1.IdValidator.validate(researchId, 'Investigación');
            await repository.deleteByResearchId(researchId);
            res.status(204).send();
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
            Logger_1.Logger.danger('Error in ResearchAnalysisController.deleteByResearchId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ResearchAnalysisController = ResearchAnalysisController;
//# sourceMappingURL=ResearchAnalysisController.js.map