"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarAiAnalysisRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class CalendarAiAnalysisRepository {
    constructor() {
        this.table = 'calendar_ai_analyses';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            calendar_event_id: data.calendarEventId,
            research_id: data.researchId,
            event_title: data.eventTitle,
            event_type: data.eventType,
            event_date: data.eventDate,
            research_name: data.researchName,
            content: data.content,
            model: data.model,
            generated_at: data.generatedAt,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findAll(filters) {
        let query = supabase_1.supabase
            .from(this.table)
            .select('*');
        if (filters?.calendarEventId) {
            query = query.eq('calendar_event_id', filters.calendarEventId);
        }
        if (filters?.researchId) {
            query = query.eq('research_id', filters.researchId);
        }
        if (filters?.from) {
            query = query.gte('event_date', filters.from);
        }
        if (filters?.to) {
            query = query.lte('event_date', filters.to);
        }
        const { data, error } = await query
            .order('generated_at', { ascending: false });
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
    async delete(id) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(error.message);
    }
    async getEventAnalysisSummary(eventIds) {
        if (eventIds.length === 0)
            return [];
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('calendar_event_id, generated_at')
            .in('calendar_event_id', eventIds)
            .order('generated_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        const summaryMap = new Map();
        for (const row of data || []) {
            const existing = summaryMap.get(row.calendar_event_id);
            if (existing) {
                existing.count++;
            }
            else {
                summaryMap.set(row.calendar_event_id, {
                    count: 1,
                    lastGeneratedAt: row.generated_at,
                });
            }
        }
        return Array.from(summaryMap.entries()).map(([calendarEventId, info]) => ({
            calendarEventId,
            count: info.count,
            lastGeneratedAt: info.lastGeneratedAt,
        }));
    }
    mapToEntity(data) {
        return {
            id: data.id,
            calendarEventId: data.calendar_event_id,
            researchId: data.research_id || null,
            eventTitle: data.event_title,
            eventType: data.event_type,
            eventDate: data.event_date,
            researchName: data.research_name || null,
            content: data.content,
            model: data.model || null,
            generatedAt: new Date(data.generated_at),
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.CalendarAiAnalysisRepository = CalendarAiAnalysisRepository;
//# sourceMappingURL=CalendarAiAnalysisRepository.js.map