import { Request, Response } from 'express';
export declare class AiDocumentUploadController {
    static create(req: Request, res: Response): Promise<void>;
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<void>;
    static queueAnalysis(req: Request, res: Response): Promise<void>;
    private static handleError;
}
//# sourceMappingURL=AiDocumentUploadController.d.ts.map