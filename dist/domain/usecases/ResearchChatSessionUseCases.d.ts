import { ResearchChatSession, ResearchChatSessionMetadata } from '../entities';
import { IResearchChatSessionRepository } from '../repositories';
export declare class CreateResearchChatSessionUseCase {
    private readonly repository;
    constructor(repository: IResearchChatSessionRepository);
    execute(data: {
        researchId: string;
        session: {
            title: string;
            originalDescription?: string;
            messages?: {
                role: 'user' | 'assistant';
                content: string;
                timestamp: string;
            }[];
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
    }): Promise<{
        session: ResearchChatSession;
        metadata: ResearchChatSessionMetadata | null;
    }>;
}
//# sourceMappingURL=ResearchChatSessionUseCases.d.ts.map