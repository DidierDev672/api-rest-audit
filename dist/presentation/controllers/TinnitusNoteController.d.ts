import { Request, Response } from 'express';
export declare class TinnitusNoteController {
    static create(req: Request, res: Response): Promise<void>;
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<void>;
    static findByPatient(req: Request, res: Response): Promise<void>;
    static createForPatient(req: Request, res: Response): Promise<void>;
    static findByQuestionnaire(req: Request, res: Response): Promise<void>;
    static findByResponse(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=TinnitusNoteController.d.ts.map