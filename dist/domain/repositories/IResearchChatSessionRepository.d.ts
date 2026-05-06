import { ResearchChatSession, ResearchChatSessionMetadata } from '../entities';
export interface IResearchChatSessionRepository {
    createSessionWithMessages(researchId: string, session: {
        title: string;
        originalDescription?: string;
        messages?: {
            role: 'user' | 'assistant';
            content: string;
            timestamp: string;
        }[];
        summary?: string;
        tags?: string[];
    }, metadata?: {
        totalMessages?: number;
        totalUserMessages?: number;
        totalAssistantMessages?: number;
        duration?: number;
        aiModel?: string;
    }): Promise<{
        session: ResearchChatSession;
        metadata: ResearchChatSessionMetadata | null;
    }>;
    findByResearchId(researchId: string): Promise<ResearchChatSession[]>;
    findById(sessionId: string): Promise<ResearchChatSession | null>;
}
//# sourceMappingURL=IResearchChatSessionRepository.d.ts.map