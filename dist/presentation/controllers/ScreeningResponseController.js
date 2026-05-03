"use strict";
/**
 * Controller - Screening Response
 * Handles HTTP requests for tamizaje responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningResponseController = void 0;
const usecases_1 = require("../../domain/usecases");
const validators_1 = require("../../infrastructure/validators");
const supabase_1 = require("../../infrastructure/database/supabase");
exports.ScreeningResponseController = {
    /**
     * POST /api/screening-responses - Create a new response
     */
    async create(req, res) {
        try {
            const data = req.body;
            // Validate required fields using middleware
            const validation = validators_1.ScreeningResponseValidator.validate(data);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: validation.errors,
                });
            }
            // Check if response already exists for this patient and screening
            const existingResponse = await supabase_1.supabase
                .from('screening_responses')
                .select('*')
                .eq('id_patient', data.id_patient)
                .eq('id_screening', data.id_screening)
                .single();
            if (existingResponse.data) {
                return res.status(409).json({
                    success: false,
                    error: 'Ya existe una respuesta para este paciente y tamizaje',
                });
            }
            const result = await usecases_1.ScreeningResponseUseCases.create(data);
            return res.status(201).json({
                success: true,
                data: result,
                message: 'Respuesta de tamizaje creada exitosamente',
            });
        }
        catch (error) {
            console.error('Error creating screening response:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * GET /api/screening-responses/:id - Get response by ID
     */
    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await usecases_1.ScreeningResponseUseCases.getById(id);
            if (!result) {
                return res.status(404).json({
                    success: false,
                    error: 'Respuesta de tamizaje no encontrada',
                });
            }
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            console.error('Error getting screening response:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * GET /api/screening-responses/patient/:patientId - Get all responses for a patient
     */
    async getByPatient(req, res) {
        try {
            const { patientId } = req.params;
            const results = await usecases_1.ScreeningResponseUseCases.getByPatient(patientId);
            return res.json({
                success: true,
                data: results,
                count: results.length,
            });
        }
        catch (error) {
            console.error('Error getting screening responses by patient:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * GET /api/screening-responses/screening/:screeningId - Get all responses for a screening
     */
    async getByScreening(req, res) {
        try {
            const { screeningId } = req.params;
            const results = await usecases_1.ScreeningResponseUseCases.getByScreening(screeningId);
            return res.json({
                success: true,
                data: results,
                count: results.length,
            });
        }
        catch (error) {
            console.error('Error getting screening responses by screening:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * PUT /api/screening-responses/:id - Update response
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            // Validate partial update
            const validation = validators_1.ScreeningResponseValidator.validatePartial(data);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: validation.errors,
                });
            }
            const existing = await usecases_1.ScreeningResponseUseCases.getById(id);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    error: 'Respuesta de tamizaje no encontrada',
                });
            }
            const result = await usecases_1.ScreeningResponseUseCases.update(id, data);
            return res.json({
                success: true,
                data: result,
                message: 'Respuesta de tamizaje actualizada exitosamente',
            });
        }
        catch (error) {
            console.error('Error updating screening response:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * DELETE /api/screening-responses/:id - Delete response
     */
    async delete(req, res) {
        try {
            const { id } = req.params;
            const existing = await usecases_1.ScreeningResponseUseCases.getById(id);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    error: 'Respuesta de tamizaje no encontrada',
                });
            }
            await usecases_1.ScreeningResponseUseCases.delete(id);
            return res.json({
                success: true,
                message: 'Respuesta de tamizaje eliminada exitosamente',
            });
        }
        catch (error) {
            console.error('Error deleting screening response:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * GET /api/screening-responses - Get all responses (admin)
     */
    async getAll(req, res) {
        try {
            const results = await usecases_1.ScreeningResponseUseCases.getAll();
            return res.json({
                success: true,
                data: results,
                count: results.length,
            });
        }
        catch (error) {
            console.error('Error getting all screening responses:', error);
            return res.status(500).json({
                success: false,
                error: error.message || 'Error interno del servidor',
            });
        }
    },
    /**
     * POST /api/screening-responses/validate - Validate response data
     */
    validate(req, res) {
        const data = req.body;
        const validation = validators_1.ScreeningResponseValidator.validate(data);
        return res.json({
            valid: validation.valid,
            errors: validation.errors,
        });
    },
};
//# sourceMappingURL=ScreeningResponseController.js.map