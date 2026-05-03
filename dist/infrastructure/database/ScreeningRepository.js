"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
class ScreeningRepository {
    constructor() {
        this.table = 'screenings';
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
            sound: data.sound ?? '',
            questions: data.questions ?? [],
            options_answer: data.optionsAnswer ?? [],
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
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.questions !== undefined)
            updateData.questions = data.questions;
        if (data.optionsAnswer !== undefined)
            updateData.options_answer = data.optionsAnswer;
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
    mapToEntity(data) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            sound: data.sound ?? '',
            questions: data.questions?.map((q) => ({
                id: q.id ?? '',
                title: q.title ?? '',
                description: q.description ?? '',
                sound: q.sound ?? '',
                optionsAnswer: q.optionsAnswer?.map((opt) => ({
                    id: opt.id ?? '',
                    text: opt.text ?? '',
                    value: opt.value ?? 0
                })) || []
            })) || [],
            optionsAnswer: data.options_answer?.map((opt) => ({
                id: opt.id ?? '',
                text: opt.text ?? '',
                value: opt.value ?? 0
            })) || [],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.ScreeningRepository = ScreeningRepository;
//# sourceMappingURL=ScreeningRepository.js.map