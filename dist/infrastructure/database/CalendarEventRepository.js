"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEventRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class CalendarEventRepository {
    constructor() {
        this.table = 'calendar_events';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            type: data.type,
            title: data.title,
            description: data.description,
            start_date: data.startDate,
            end_date: data.endDate,
            start_time: data.startTime,
            end_time: data.endTime,
            research_id: data.researchId,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findByDateRange(from, to) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .gte('start_date', from)
            .lte('start_date', to)
            .order('start_date', { ascending: true });
        if (error)
            throw new Error(error.message);
        return (data || []).map(this.mapToEntity);
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
        const updateData = { updated_at: now };
        if (data.type !== undefined)
            updateData.type = data.type;
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.description !== undefined)
            updateData.description = data.description;
        if (data.startDate !== undefined)
            updateData.start_date = data.startDate;
        if (data.endDate !== undefined)
            updateData.end_date = data.endDate;
        if (data.startTime !== undefined)
            updateData.start_time = data.startTime;
        if (data.endTime !== undefined)
            updateData.end_time = data.endTime;
        if (data.researchId !== undefined)
            updateData.research_id = data.researchId;
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
            type: data.type,
            title: data.title,
            description: data.description || '',
            startDate: data.start_date,
            endDate: data.end_date,
            startTime: data.start_time,
            endTime: data.end_time,
            researchId: data.research_id || null,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.CalendarEventRepository = CalendarEventRepository;
//# sourceMappingURL=CalendarEventRepository.js.map