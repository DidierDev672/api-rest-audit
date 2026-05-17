"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchAnalysisRepository = void 0;
const supabase_1 = require("../database/supabase");
const Logger_1 = require("../logger/Logger");
class ResearchAnalysisRepository {
    constructor() {
        this.table = 'research_analysis';
    }
    async create(data) {
        Logger_1.Logger.info('Creating research analysis', { researchId: data.researchId });
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            research_id: data.researchId,
            analysis: data.analysis,
            notes_count: data.notesCount,
            notes_references: data.notesReferences,
        })
            .select()
            .single();
        if (error) {
            Logger_1.Logger.danger('Error creating research analysis', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Research analysis created');
        return this.mapToEntity(result);
    }
    async findAll() {
        Logger_1.Logger.info('Finding all research analyses');
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error finding all research analyses', { error: error.message });
            throw new Error(error.message);
        }
        return data.map(this.mapToEntity);
    }
    async findById(id) {
        Logger_1.Logger.info('Finding research analysis by ID', { id });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116')
                return null;
            Logger_1.Logger.danger('Error finding research analysis', { error: error.message });
            throw new Error(error.message);
        }
        return this.mapToEntity(data);
    }
    async findByResearchId(researchId) {
        Logger_1.Logger.info('Finding research analysis by research ID', { researchId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('research_id', researchId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error finding research analysis', { error: error.message });
            throw new Error(error.message);
        }
        return data.map(this.mapToEntity);
    }
    async update(id, data) {
        Logger_1.Logger.info('Updating research analysis', { id });
        const updateData = {};
        if (data.researchId)
            updateData.research_id = data.researchId;
        if (data.analysis)
            updateData.analysis = data.analysis;
        if (data.notesCount !== undefined)
            updateData.notes_count = data.notesCount;
        if (data.notesReferences)
            updateData.notes_references = data.notesReferences;
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            Logger_1.Logger.danger('Error updating research analysis', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Research analysis updated');
        return this.mapToEntity(result);
    }
    async delete(id) {
        Logger_1.Logger.info('Deleting research analysis', { id });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error) {
            Logger_1.Logger.danger('Error deleting research analysis', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Research analysis deleted');
    }
    async deleteByResearchId(researchId) {
        Logger_1.Logger.info('Deleting research analysis by research ID', { researchId });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('research_id', researchId);
        if (error) {
            Logger_1.Logger.danger('Error deleting research analysis', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Research analysis deleted by research ID');
    }
    mapToEntity(data) {
        return {
            id: data.id,
            researchId: data.research_id,
            analysis: data.analysis,
            notesCount: data.notes_count,
            notesReferences: data.notes_references,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.ResearchAnalysisRepository = ResearchAnalysisRepository;
//# sourceMappingURL=ResearchAnalysisRepository.js.map