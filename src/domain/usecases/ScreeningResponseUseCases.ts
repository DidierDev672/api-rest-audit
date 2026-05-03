/**
 * Use Cases - Screening Response
 * Business logic for tamizaje responses
 */

import { supabase } from '../../infrastructure/database/supabase';

export const ScreeningResponseUseCases = {
  /**
   * Create a new screening response
   */
  async create(data: {
    id_patient: string;
    id_screening: string;
    options_answer: Array<{ id: string; text: string; value: number }>;
  }): Promise<any> {
    const { data: result, error } = await supabase
      .from('screening_responses')
      .insert([
        {
          id_patient: data.id_patient,
          id_screening: data.id_screening,
          options_answer: data.options_answer,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating screening response:', error);
      throw new Error(error.message);
    }

    return result;
  },

  /**
   * Get screening response by ID
   */
  async getById(id: string): Promise<any | null> {
    const { data: result, error } = await supabase
      .from('screening_responses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting screening response:', error);
      return null;
    }

    return result;
  },

  /**
   * Get all responses for a patient
   */
  async getByPatient(patientId: string): Promise<any[]> {
    const { data: results, error } = await supabase
      .from('screening_responses')
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting screening responses by patient:', error);
      return [];
    }

    return results || [];
  },

  /**
   * Get all responses for a screening
   */
  async getByScreening(screeningId: string): Promise<any[]> {
    const { data: results, error } = await supabase
      .from('screening_responses')
      .select('*')
      .eq('id_screening', screeningId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting screening responses by screening:', error);
      return [];
    }

    return results || [];
  },

  /**
   * Update a screening response
   */
  async update(
    id: string,
    data: { options_answer?: Array<{ id: string; text: string; value: number }> }
  ): Promise<any> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (data.options_answer) {
      updateData.options_answer = data.options_answer;
    }

    const { data: result, error } = await supabase
      .from('screening_responses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating screening response:', error);
      throw new Error(error.message);
    }

    return result;
  },

  /**
   * Delete a screening response
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('screening_responses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting screening response:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Get all screening responses
   */
  async getAll(): Promise<any[]> {
    const { data: results, error } = await supabase
      .from('screening_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting all screening responses:', error);
      return [];
    }

    return results || [];
  },
};
