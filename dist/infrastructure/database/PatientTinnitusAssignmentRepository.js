"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientTinnitusAssignmentRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
class PatientTinnitusAssignmentRepository {
    constructor() {
        this.table = 'patient_tinnitus_assignments';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            id_patient: data.idPatient,
            id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
            status: data.status ?? 'active',
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findByPatientId(idPatient) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_patient', idPatient)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data.map(this.mapToEntity);
    }
    async findByTinnitusId(idTinnitus) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_tinnitus_questionnaires', idTinnitus)
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
    async delete(id) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(error.message);
    }
    async deleteByPatientId(idPatient) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id_patient', idPatient);
        if (error)
            throw new Error(error.message);
    }
    async deleteByTinnitusId(idTinnitus) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id_tinnitus_questionnaires', idTinnitus);
        if (error)
            throw new Error(error.message);
    }
    async update(id, data) {
        const now = new Date();
        const updateData = { updated_at: now };
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.idPatient !== undefined)
            updateData.id_patient = data.idPatient;
        if (data.idTinnitusQuestionnaires !== undefined)
            updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
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
    mapToEntity(data) {
        return {
            id: data.id,
            idPatient: data.id_patient,
            idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
            status: data.status ?? 'active',
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.PatientTinnitusAssignmentRepository = PatientTinnitusAssignmentRepository;
//# sourceMappingURL=PatientTinnitusAssignmentRepository.js.map