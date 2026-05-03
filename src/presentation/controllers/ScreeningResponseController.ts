/**
 * Controller - Screening Response
 * Handles HTTP requests for tamizaje responses
 */

import { Request, Response } from 'express';
import { ScreeningResponseUseCases } from '../../domain/usecases';
import { ScreeningResponseValidator } from '../../infrastructure/validators';
import { supabase } from '../../infrastructure/database/supabase';

export const ScreeningResponseController = {
  /**
   * POST /api/screening-responses - Create a new response
   */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      // Validate required fields using middleware
      const validation = ScreeningResponseValidator.validate(data);
      
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
      }

      // Check if response already exists for this patient and screening
      const existingResponse = await supabase
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

      const result = await ScreeningResponseUseCases.create(data);

      return res.status(201).json({
        success: true,
        data: result,
        message: 'Respuesta de tamizaje creada exitosamente',
      });
    } catch (error: any) {
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
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const result = await ScreeningResponseUseCases.getById(id);

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
    } catch (error: any) {
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
  async getByPatient(req: Request, res: Response): Promise<Response> {
    try {
      const { patientId } = req.params;

      const results = await ScreeningResponseUseCases.getByPatient(patientId);

      return res.json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error: any) {
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
  async getByScreening(req: Request, res: Response): Promise<Response> {
    try {
      const { screeningId } = req.params;

      const results = await ScreeningResponseUseCases.getByScreening(screeningId);

      return res.json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error: any) {
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
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      // Validate partial update
      const validation = ScreeningResponseValidator.validatePartial(data);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        });
      }

      const existing = await ScreeningResponseUseCases.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: 'Respuesta de tamizaje no encontrada',
        });
      }

      const result = await ScreeningResponseUseCases.update(id, data);

      return res.json({
        success: true,
        data: result,
        message: 'Respuesta de tamizaje actualizada exitosamente',
      });
    } catch (error: any) {
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
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const existing = await ScreeningResponseUseCases.getById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: 'Respuesta de tamizaje no encontrada',
        });
      }

      await ScreeningResponseUseCases.delete(id);

      return res.json({
        success: true,
        message: 'Respuesta de tamizaje eliminada exitosamente',
      });
    } catch (error: any) {
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
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const results = await ScreeningResponseUseCases.getAll();

      return res.json({
        success: true,
        data: results,
        count: results.length,
      });
    } catch (error: any) {
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
  validate(req: Request, res: Response): Response {
    const data = req.body;
    const validation = ScreeningResponseValidator.validate(data);

    return res.json({
      valid: validation.valid,
      errors: validation.errors,
    });
  },
};
