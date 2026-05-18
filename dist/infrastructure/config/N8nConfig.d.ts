export interface N8nConfig {
    webhookUrl: string;
    webhookSecret?: string;
    requestTimeoutMs: number;
}
export declare class N8nConfigProvider {
    static load(): N8nConfig;
}
//# sourceMappingURL=N8nConfig.d.ts.map