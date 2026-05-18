import { CreateN8nWebhookLogInput, IN8nWebhookLogRepository } from '../../domain/repositories/IN8nWebhookLogRepository';
import { N8nWebhookLog } from '../../domain/entities/N8nIntegration';
export declare class N8nWebhookLogRepository implements IN8nWebhookLogRepository {
    private readonly table;
    create(data: CreateN8nWebhookLogInput): Promise<N8nWebhookLog>;
    findById(id: string): Promise<N8nWebhookLog | null>;
    private mapToEntity;
}
//# sourceMappingURL=N8nWebhookLogRepository.d.ts.map