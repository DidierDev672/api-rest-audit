"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientScreeningAssignmentRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
class PatientScreeningAssignmentRepository {
    constructor() {
        this.table = 'patient_screening_assignments';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            patient_id: data.patientId,
            screening_ids: data.screeningIds,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findByPatientId(patientId) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('patient_id', patientId)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data.map(this.mapToEntity);
    }
    async findById(id) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    async update(id, data) {
        const now = new Date();
        const updateData = {};
        if (data.patientId !== undefined)
            updateData.patient_id = data.patientId;
        if (data.screeningIds !== undefined)
            updateData.screening_ids = data.screeningIds;
        updateData.updated_at = now;
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async delete(id) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(error.message);
    }
    async deleteByPatientId(patientId) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('patient_id', patientId);
        if (error)
            throw new Error(error.message);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            patientId: data.patient_id,
            screeningIds: data.screening_ids || [],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.PatientScreeningAssignmentRepository = PatientScreeningAssignmentRepository;
//# sourceMappingURL=PatientScreeningAssignmentRepository.js.map