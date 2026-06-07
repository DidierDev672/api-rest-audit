import { Request, Response } from 'express';
import { AssignAiResearchUseCase } from '../../application/use-cases/AssignAiResearchUseCase';
import { GetAiResearchUseCase } from '../../application/use-cases/GetAiResearchUseCase';
import { UpdateAiResearchAssignmentUseCase } from '../../application/use-cases/UpdateAiResearchAssignmentUseCase';
import { ProcessDueAiResearchAssignmentsUseCase } from '../../application/use-cases/ProcessDueAiResearchAssignmentsUseCase';
import { AiResearchAssignmentRepository } from '../../infrastructure/database/AiResearchAssignmentRepository';
import { AiResearchResultRepository } from '../../infrastructure/database/AiResearchResultRepository';
import { AiResearchResultNoteRepository } from '../../infrastructure/database/AiResearchResultNoteRepository';
import { AiModelCredentialRepository } from '../../infrastructure/database/AiModelCredentialRepository';
import { GeminiResearchGateway } from '../../infrastructure/clients/GeminiResearchGateway';
import {
  AssignAiResearchSchema,
  UpdateAiResearchAssignmentSchema,
} from '../dto/AiResearchAssignmentDTO';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { ValidationError } from '../../domain/errors/ValidationError';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const assignmentRepository = new AiResearchAssignmentRepository();
const resultRepository = new AiResearchResultRepository();
const resultNoteRepository = new AiResearchResultNoteRepository();
const credentialRepository = new AiModelCredentialRepository();
const aiGateway = new GeminiResearchGateway();

const assignUseCase = new AssignAiResearchUseCase(assignmentRepository);
const getUseCase = new GetAiResearchUseCase(assignmentRepository, resultRepository);
const updateUseCase = new UpdateAiResearchAssignmentUseCase(assignmentRepository);
const processDueUseCase = new ProcessDueAiResearchAssignmentsUseCase(
  assignmentRepository,
  resultRepository,
  credentialRepository,
  aiGateway,
);

export class AiResearchAssignmentController {
  /** POST /api/v1/ai-research-assignments — asigna una investigación a la IA. */
  static async assign(req: Request, res: Response) {
    try {
      const data = AssignAiResearchSchema.parse(req.body);
      const result = await assignUseCase.execute(data);
      res.status(201).json({
        status: 'success',
        message: 'Investigación asignada a la IA correctamente',
        data: result,
      });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'assign');
    }
  }

  static async findByOwner(req: Request, res: Response) {
    try {
      const { ownerId } = req.params;
      if (!ownerId?.trim()) throw new AppError('ownerId es requerido', 400);
      const data = await getUseCase.getAssignmentsByOwner(ownerId.trim());
      res.json({ status: 'success', data });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'findByOwner');
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiResearchAssignment');
      const data = await getUseCase.getAssignmentById(id);
      res.json({ status: 'success', data });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'findById');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiResearchAssignment');
      const data = UpdateAiResearchAssignmentSchema.parse(req.body);
      const updated = await updateUseCase.execute(id, data);
      res.json({
        status: 'success',
        message: 'Asignación actualizada correctamente',
        data: updated,
      });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'update');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiResearchAssignment');
      await assignmentRepository.delete(id);
      res.json({ status: 'success', message: 'Asignación eliminada correctamente' });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'delete');
    }
  }

  /** GET /results/owner/:ownerId?unseen=true — resultados del usuario. */
  static async findResultsByOwner(req: Request, res: Response) {
    try {
      const { ownerId } = req.params;
      if (!ownerId?.trim()) throw new AppError('ownerId es requerido', 400);
      const onlyUnseen = String(req.query.unseen ?? '').toLowerCase() === 'true';
      const data = await getUseCase.getResultsByOwner(ownerId.trim(), onlyUnseen);
      res.json({ status: 'success', data });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'findResultsByOwner');
    }
  }

  /** GET /:id/results — resultados de una asignación concreta. */
  static async findResultsByAssignment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiResearchAssignment');
      const data = await getUseCase.getResultsByAssignment(id);
      res.json({ status: 'success', data });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'findResultsByAssignment');
    }
  }

  /** POST /results/:resultId/seen — marca un resultado como visto. */
  static async markResultSeen(req: Request, res: Response) {
    try {
      const { resultId } = req.params;
      IdValidator.validate(resultId, 'AiResearchResult');
      await getUseCase.markResultSeen(resultId);
      res.json({ status: 'success', message: 'Resultado marcado como visto' });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'markResultSeen');
    }
  }

  /** DELETE /results/:resultId — elimina un resultado de investigación IA. */
  static async deleteResult(req: Request, res: Response) {
    try {
      const { resultId } = req.params;
      IdValidator.validate(resultId, 'AiResearchResult');
      const existing = await resultRepository.findById(resultId);
      if (!existing) throw new AppError('Resultado no encontrado', 404);
      await resultRepository.delete(resultId);
      res.status(204).send();
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'deleteResult');
    }
  }

  /** GET /results/:resultId/notes — notas del resultado. */
  static async findResultNotes(req: Request, res: Response) {
    try {
      const { resultId } = req.params;
      IdValidator.validate(resultId, 'AiResearchResult');
      const result = await resultRepository.findById(resultId);
      if (!result) throw new AppError('Resultado no encontrado', 404);
      const notes = await resultNoteRepository.findByResultId(resultId);
      res.json({ status: 'success', data: notes });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'findResultNotes');
    }
  }

  /** POST /results/:resultId/notes — crea una nota para el resultado. */
  static async createResultNote(req: Request, res: Response) {
    try {
      const { resultId } = req.params;
      IdValidator.validate(resultId, 'AiResearchResult');
      const result = await resultRepository.findById(resultId);
      if (!result) throw new AppError('Resultado no encontrado', 404);

      const content = String(req.body?.content ?? '').trim();
      if (!content) throw new AppError('El contenido de la nota es requerido', 400);

      const color = String(req.body?.color ?? '#FAD4C0').trim() || '#FAD4C0';
      const colorName = String(req.body?.color_name ?? req.body?.colorName ?? 'Melocotón').trim()
        || 'Melocotón';
      const createdAt = req.body?.created_at ? new Date(req.body.created_at) : undefined;

      const note = await resultNoteRepository.create({
        aiResearchResultId: resultId,
        content,
        color: color.startsWith('#') ? color : `#${color}`,
        colorName,
        createdAt,
      });

      res.status(201).json({ status: 'success', data: note });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'createResultNote');
    }
  }

  /** DELETE /results/notes/:noteId — elimina una nota. */
  static async deleteResultNote(req: Request, res: Response) {
    try {
      const { noteId } = req.params;
      IdValidator.validate(noteId, 'AiResearchResultNote');
      const existing = await resultNoteRepository.findById(noteId);
      if (!existing) throw new AppError('Nota no encontrada', 404);
      await resultNoteRepository.delete(noteId);
      res.status(204).send();
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'deleteResultNote');
    }
  }

  /** POST /process-due — ejecuta ahora las investigaciones vencidas. */
  static async processDue(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit ?? 25);
      const result = await processDueUseCase.execute(
        Number.isFinite(limit) && limit > 0 ? limit : 25,
      );
      res.json({ status: 'success', data: result });
    } catch (error) {
      AiResearchAssignmentController.handleError(error, res, 'processDue');
    }
  }

  private static handleError(error: unknown, res: Response, action: string) {
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      res.status(400).json({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: firstError.message,
        details: { field: firstError.path.join('.') },
      });
      return;
    }
    if (error instanceof ValidationError) {
      res.status(404).json({ status: 'error', code: 'NOT_FOUND', message: error.message });
      return;
    }
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: 'error',
        code: 'APP_ERROR',
        message: error.message,
      });
      return;
    }
    Logger.danger(`Error en AiResearchAssignmentController.${action}`, {
      error: (error as Error).message,
    });
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: (error as Error).message,
    });
  }
}
