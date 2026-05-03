import { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class ValidationAppError extends AppError {
    errors: any[];
    constructor(message: string, errors: any[]);
}
export declare class NotFoundAppError extends AppError {
    constructor(message: string);
}
export declare class ConflictAppError extends AppError {
    constructor(message: string);
}
export declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, res: Response) => void;
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map