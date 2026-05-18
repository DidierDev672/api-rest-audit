import { CreateN8nTextExchangeInput, IN8nTextExchangeRepository } from '../../domain/repositories/IN8nTextExchangeRepository';
import { N8nTextExchange } from '../../domain/entities/N8nIntegration';
export declare class N8nTextExchangeRepository implements IN8nTextExchangeRepository {
    private readonly table;
    create(data: CreateN8nTextExchangeInput): Promise<N8nTextExchange>;
    findById(id: string): Promise<N8nTextExchange | null>;
    findByWebhookLogId(webhookLogId: string): Promise<N8nTextExchange | null>;
    private mapToEntity;
}
//# sourceMappingURL=N8nTextExchangeRepository.d.ts.map