"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusQuestionnaireRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
class TinnitusQuestionnaireRepository {
    constructor() {
        this.table = 'tinnitus_questionnaires';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            title: data.title,
            description: data.description,
            questions: data.questions,
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
    async update(id, data) {
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .update({
            title: data.title,
            description: data.description,
            questions: data.questions,
            updated_at: now
        })
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
            title: data.title,
            description: data.description,
            questions: data.questions,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.TinnitusQuestionnaireRepository = TinnitusQuestionnaireRepository;
//# sourceMappingURL=TinnitusQuestionnaireRepository.js.map