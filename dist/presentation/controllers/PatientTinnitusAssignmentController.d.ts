import { Request, Response } from 'express';
export declare class PatientTinnitusAssignmentController {
    static assign(req: Request, res: Response): Promise<void>;
    static getByPatient(req: Request, res: Response): Promise<void>;
    static getById(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
    static deleteByPatient(req: Request, res: Response): Promise<void>;
    static validate(req: Request, res: Response): Promise<void>;
    static checkPatientExists(req: Request, res: Response): Promise<void>;
    static checkTinnitusExists(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=PatientTinnitusAssignmentController.d.ts.map