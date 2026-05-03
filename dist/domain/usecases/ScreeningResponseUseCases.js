"use strict";
/**
 * Use Cases - Screening Response
 * Business logic for tamizaje responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningResponseUseCases = void 0;
const supabase_1 = require("../../infrastructure/database/supabase");
exports.ScreeningResponseUseCases = {
    /**
     * Create a new screening response
     */
    async create(data) {
        const { data: result, error } = await supabase_1.supabase
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
    async getById(id) {
        const { data: result, error } = await supabase_1.supabase
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
    async getByPatient(patientId) {
        const { data: results, error } = await supabase_1.supabase
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
    async getByScreening(screeningId) {
        const { data: results, error } = await supabase_1.supabase
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
    async update(id, data) {
        const updateData = {
            updated_at: new Date().toISOString(),
        };
        if (data.options_answer) {
            updateData.options_answer = data.options_answer;
        }
        const { data: result, error } = await supabase_1.supabase
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
    async delete(id) {
        const { error } = await supabase_1.supabase
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
    async getAll() {
        const { data: results, error } = await supabase_1.supabase
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
//# sourceMappingURL=ScreeningResponseUseCases.js.map