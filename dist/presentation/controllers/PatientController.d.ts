import { Request, Response } from 'express';
export declare class PatientController {
    static create(req: Request, res: Response): Promise<void>;
    static searchByName(req: Request, res: Response): Promise<void>;
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=PatientController.d.ts.map