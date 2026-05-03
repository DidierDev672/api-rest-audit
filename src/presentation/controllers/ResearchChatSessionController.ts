import { Request, Response } from 'express';
import { CreateResearchChatSessionUseCase, FindResearchChatSessionByIdUseCase } from '../../domain/usecases';
import { ResearchChatSessionRepository } from '../../infrastructure/database';
import { CreateResearchChatSessionDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new ResearchChatSessionRepository();

export class ResearchChatSessionController {
  static async createSession(req: Request, res: Response) {
    try {
      const { idResearch } = req.params;
      const data = CreateResearchChatSessionDTO.parse({
        ...req.body,
        researchId: idResearch,
      });

      const useCase = new CreateResearchChatSessionUseCase(repository);
      const result = await useCase.execute(data);

      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en ResearchChatSessionController.createSession', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { idSession } = req.params;

      const useCase = new FindResearchChatSessionByIdUseCase(repository);
      const session = await useCase.execute(idSession);

      if (!session) {
        res.status(404).json({ error: 'Chat session no encontrada' });
        return;
      }

      res.status(200).json(session);
    } catch (error) {
      Logger.danger('Error en ResearchChatSessionController.findById', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}