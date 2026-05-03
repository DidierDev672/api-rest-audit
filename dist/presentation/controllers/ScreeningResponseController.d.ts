/**
 * Controller - Screening Response
 * Handles HTTP requests for tamizaje responses
 */
import { Request, Response } from 'express';
export declare const ScreeningResponseController: {
    /**
     * POST /api/screening-responses - Create a new response
     */
    create(req: Request, res: Response): Promise<Response>;
    /**
     * GET /api/screening-responses/:id - Get response by ID
     */
    getById(req: Request, res: Response): Promise<Response>;
    /**
     * GET /api/screening-responses/patient/:patientId - Get all responses for a patient
     */
    getByPatient(req: Request, res: Response): Promise<Response>;
    /**
     * GET /api/screening-responses/screening/:screeningId - Get all responses for a screening
     */
    getByScreening(req: Request, res: Response): Promise<Response>;
    /**
     * PUT /api/screening-responses/:id - Update response
     */
    update(req: Request, res: Response): Promise<Response>;
    /**
     * DELETE /api/screening-responses/:id - Delete response
     */
    delete(req: Request, res: Response): Promise<Response>;
    /**
     * GET /api/screening-responses - Get all responses (admin)
     */
    getAll(req: Request, res: Response): Promise<Response>;
    /**
     * POST /api/screening-responses/validate - Validate response data
     */
    validate(req: Request, res: Response): Response;
};
//# sourceMappingURL=ScreeningResponseController.d.ts.map