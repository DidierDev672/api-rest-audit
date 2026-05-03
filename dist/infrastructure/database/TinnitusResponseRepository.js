"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusResponseRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
class TinnitusResponseRepository {
    constructor() {
        this.table = 'tinnitus_responses';
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
            answer: data.answer,
            created_at: now,
            updated_at: now
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findAll() {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
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
    async findByPatientId(patientId) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_patient', patientId)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data.map(this.mapToEntity);
    }
    async findByQuestionnaireId(questionnaireId) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_tinnitus_questionnaires', questionnaireId)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data.map(this.mapToEntity);
    }
    async update(id, data) {
        const now = new Date();
        const updateData = {
            updated_at: now
        };
        if (data.idPatient)
            updateData.id_patient = data.idPatient;
        if (data.idTinnitusQuestionnaires)
            updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
        if (data.answer)
            updateData.answer = data.answer;
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
    mapToEntity(data) {
        return {
            id: data.id,
            idPatient: data.id_patient,
            idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
            answer: data.answer,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.TinnitusResponseRepository = TinnitusResponseRepository;
//# sourceMappingURL=TinnitusResponseRepository.js.map