import { N8nTextRequest, N8nTextResponse } from '../entities/N8nTextMessage';
export interface IN8nTextGateway {
    sendText(request: N8nTextRequest): Promise<N8nTextResponse>;
}
//# sourceMappingURL=IN8nTextGateway.d.ts.map