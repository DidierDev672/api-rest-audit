import { IN8nTextGateway } from '../../domain/ports/IN8nTextGateway';
import { N8nTextRequest, N8nTextResponse } from '../../domain/entities/N8nTextMessage';
import { N8nConfig } from '../config/N8nConfig';
import { IN8nResponseParser } from './N8nResponseParser';
export declare class N8nHttpClient implements IN8nTextGateway {
    private readonly config;
    private readonly responseParser;
    constructor(config: N8nConfig, responseParser?: IN8nResponseParser);
    sendText(request: N8nTextRequest): Promise<N8nTextResponse>;
    private parseResponseBody;
}
//# sourceMappingURL=N8nHttpClient.d.ts.map