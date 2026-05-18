import { Request, Response, NextFunction } from 'express';
export declare class N8nIntegrationController {
    static sendText(req: Request, res: Response, next: NextFunction): Promise<void>;
    static receiveText(req: Request, res: Response, next: NextFunction): Promise<void>;
    private static handleError;
}
//# sourceMappingURL=N8nIntegrationController.d.ts.map