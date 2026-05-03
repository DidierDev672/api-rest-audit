import { ResearchChatSession, ResearchChatSessionMetadata } from '../entities';
import { IResearchChatSessionRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';

export class CreateResearchChatSessionUseCase {
  constructor(private readonly repository: IResearchChatSessionRepository) {}

  async execute(data: {
    researchId: string;
    session: {
      title: string;
      originalDescription?: string;
      messages?: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
      summary?: string;
      tags?: string[];
    };
    metadata?: {
      totalMessages?: number;
      totalUserMessages?: number;
      totalAssistantMessages?: number;
      duration?: number;
      aiModel?: string;
    };
  }): Promise<{ session: ResearchChatSession; metadata: ResearchChatSessionMetadata | null }> {
    try {
      Logger.info('Creando chat session de investigacion', { researchId: data.researchId, title: data.session.title });

      const result = await this.repository.createSessionWithMessages(
        data.researchId,
        data.session,
        data.metadata
      );

      Logger.success('Chat session de investigacion creado', { title: data.session.title });
      return result;
    } catch (error) {
      Logger.danger('Error al crear chat session de investigacion', { error: (error as Error).message });
      throw error;
    }
  }
}

export class FindResearchChatSessionByIdUseCase {
  constructor(private readonly repository: IResearchChatSessionRepository) {}

  async execute(sessionId: string): Promise<ResearchChatSession | null> {
    try {
      Logger.info('Verificando si chat session existe', { sessionId });

      const session = await this.repository.findById(sessionId);

      if (!session) {
        Logger.warn('Chat session no encontrada', { sessionId });
        return null;
      }

      Logger.success('Chat session encontrada', { sessionId });
      return session;
    } catch (error) {
      Logger.danger('Error al verificar chat session', { error: (error as Error).message });
      throw error;
    }
  }
}