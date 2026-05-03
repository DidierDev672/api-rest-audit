"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientLoginRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class PatientLoginRepository {
    constructor() {
        this.table = 'patient_login';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            id_patient: data.idPatient,
            email: data.email,
            username: data.username,
            password: data.password,
            permits: data.permits,
            token: null,
            has_consent: data.hasConsent,
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findByEmail(email) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('email', email)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    async findByUsername(username) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('username', username)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    async findByIdPatient(idPatient) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_patient', idPatient)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    async updateToken(id, token) {
        const now = new Date();
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .update({ token, updated_at: now.toISOString() })
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(data);
    }
    async clearToken(id) {
        const now = new Date();
        const { error } = await supabase_1.supabase
            .from(this.table)
            .update({ token: null, updated_at: now.toISOString() })
            .eq('id', id);
        if (error)
            throw new Error(error.message);
    }
    async findByToken(token) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('token', token)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            idPatient: data.id_patient,
            email: data.email,
            username: data.username,
            password: data.password,
            permits: data.permits,
            token: data.token,
            hasConsent: data.has_consent || false,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.PatientLoginRepository = PatientLoginRepository;
//# sourceMappingURL=PatientLoginRepository.js.map