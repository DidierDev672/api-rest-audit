"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNoteController = void 0;
const CreateResearchNoteUseCase_1 = require("../../application/use-cases/CreateResearchNoteUseCase");
const database_1 = require("../../infrastructure/database");
const AuditoryResearchRepository_1 = require("../../infrastructure/database/AuditoryResearchRepository");
const dto_1 = require("../dto");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.ResearchNoteRepository();
const auditoryResearchRepository = new AuditoryResearchRepository_1.AuditoryResearchRepository();
class ResearchNoteController {
    static async create(req, res) {
        try {
            console.log(req.body);
            const data = dto_1.CreateResearchNoteDTO.parse(req.body);
            const useCase = new CreateResearchNoteUseCase_1.CreateResearchNoteUseCase(repository);
            await useCase.execute(data);
            res.status(201).json({ message: 'Nota creada' });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en ResearchNoteController.create', { error: error.message });
            Logger_1.Logger.danger('Error: ', error);
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const notes = await repository.findAll();
            res.json(notes);
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
            Logger_1.Logger.danger('Error en ResearchNoteController.findAll', { error: error.message });
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
            const notes = await repository.findByResearchId(researchId);
            res.json(notes);
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
            Logger_1.Logger.danger('Error en ResearchNoteController.findByResearchId', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findById(req, res) {
        res.status(501).json({ error: 'Not implemented' });
    }
    static async update(req, res) {
        res.status(501).json({ error: 'Not implemented' });
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            await repository.deleteByResearchId(id);
            res.status(204).send();
        }
        catch (error) {
            Logger_1.Logger.danger('Error en ResearchNoteController.delete', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ResearchNoteController = ResearchNoteController;
//# sourceMappingURL=ResearchNoteController.js.map