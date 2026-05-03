import { Request, Response } from 'express';
export declare class TinnitusResponseController {
    static create(req: Request, res: Response): Promise<void>;
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<void>;
    static findByPatientId(req: Request, res: Response): Promise<void>;
    static findByQuestionnaireId(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=TinnitusResponseController.d.ts.map