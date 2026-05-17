import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedUser {
    id: string;
    idPatient: string;
    email: string;
    permits: string[];
}
declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUser;
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authMiddleware.d.ts.map