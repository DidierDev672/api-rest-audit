import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  CreateAiDocumentAnalysisNoteUseCase,
  GetAiDocumentAnalysisNotesUseCase,
  GetAiDocumentAnalysisNoteByIdUseCase,
  DeleteAiDocumentAnalysisNoteUseCase,
} from '../../domain/usecases/AiDocumentAnalysisNoteUseCases';
import {
  AiDocumentAnalysisNoteRepository,
  AiDocumentAnalysisRepository,
} from '../../infrastructure/database';
import {
  CreateAiDocumentAnalysisNoteDTO,
  AiDocumentAnalysisNoteQueryDTO,
} from '../dto/AiDocumentAnalysisNoteDTO';
import { Logger } from '../../infrastructure/logger/Logger';

const noteRepository = new AiDocumentAnalysisNoteRepository();
const analysisRepository = new AiDocumentAnalysisRepository();

export class AiDocumentAnalysisNoteController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateAiDocumentAnalysisNoteDTO.parse(req.body);
      const useCase = new CreateAiDocumentAnalysisNoteUseCase(
        noteRepository,
        analysisRepository,
      );

      const result = await useCase.execute({
        aiDocumentAnalysisId: data.ai_document_analysis_id,
        content: data.content,
        color: data.color,
        colorName: data.color_name,
        createdAt: data.created_at,
      });

      res.status(201).json({
        id: result.id,
        ai_document_analysis_id: result.aiDocumentAnalysisId,
        content: result.content,
        color: result.color,
        color_name: result.colorName,
        created_at: result.createdAt.toISOString(),
        updated_at: result.updatedAt.toISOString(),
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const message = (error as Error).message;
      if (message.includes('no encontrado')) {
        res.status(404).json({ error: message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisNoteController.create', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = AiDocumentAnalysisNoteQueryDTO.parse(req.query);
      const useCase = new GetAiDocumentAnalysisNotesUseCase(noteRepository);
      const result = await useCase.execute(query.ai_document_analysis_id);

      res.json(
        result.map((note) => ({
          id: note.id,
          ai_document_analysis_id: note.aiDocumentAnalysisId,
          content: note.content,
          color: note.color,
          color_name: note.colorName,
          created_at: note.createdAt.toISOString(),
          updated_at: note.updatedAt.toISOString(),
        })),
      );
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisNoteController.findAll', {
        error: (error as Error).message,
      });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByAnalysisId(req: Request, res: Response) {
    try {
      const { aiDocumentAnalysisId } = req.params;
      const useCase = new GetAiDocumentAnalysisNotesUseCase(noteRepository);
      const result = await useCase.execute(aiDocumentAnalysisId);

      res.json(
        result.map((note) => ({
          id: note.id,
          ai_document_analysis_id: note.aiDocumentAnalysisId,
          content: note.content,
          color: note.color,
          color_name: note.colorName,
          created_at: note.createdAt.toISOString(),
          updated_at: note.updatedAt.toISOString(),
        })),
      );
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisNoteController.findByAnalysisId', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetAiDocumentAnalysisNoteByIdUseCase(noteRepository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Nota no encontrada' });
        return;
      }

      res.json({
        id: result.id,
        ai_document_analysis_id: result.aiDocumentAnalysisId,
        content: result.content,
        color: result.color,
        color_name: result.colorName,
        created_at: result.createdAt.toISOString(),
        updated_at: result.updatedAt.toISOString(),
      });
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisNoteController.findById', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteAiDocumentAnalysisNoteUseCase(noteRepository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no encontrada')) {
        res.status(404).json({ error: message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisNoteController.delete', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }
}
