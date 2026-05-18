import { Request, Response } from 'express';
export declare class CalendarScheduledTaskController {
    static create(req: Request, res: Response): Promise<void>;
    static findAll(req: Request, res: Response): Promise<void>;
    static findById(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
    static processDue(req: Request, res: Response): Promise<void>;
    static findAllNotifications(req: Request, res: Response): Promise<void>;
    static findNotificationById(req: Request, res: Response): Promise<void>;
    private static handleError;
}
//# sourceMappingURL=CalendarScheduledTaskController.d.ts.map