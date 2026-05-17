"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNoteAnalysisRepository = void 0;
const supabase_1 = require("./supabase");
const Logger_1 = require("../logger/Logger");
class ResearchNoteAnalysisRepository {
    constructor() {
        this.table = 'research_note_analysis';
    }
    async create(data) {
        Logger_1.Logger.info('Creando análisis de notas de investigación', { id: data.id, researchId: data.researchId });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id: data.id,
            research_id: data.researchId,
            analysis_text: data.analysisText,
            notes_count: data.notesCount,
            source: data.source,
            model_name: data.modelName,
            language: data.language,
            created_by_user_id: data.createdByUserId,
            created_at: data.createdAt.toISOString(),
            updated_at: data.updatedAt.toISOString(),
        });
        if (error) {
            Logger_1.Logger.danger('Error al crear análisis de notas de investigación', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Análisis de notas de investigación creado');
    }
    async findById(id) {
        Logger_1.Logger.info('Obteniendo análisis de notas por ID', { id });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116')
                return null;
            Logger_1.Logger.danger('Error al obtener análisis de notas', { error: error.message });
            throw new Error(error.message);
        }
        return this.mapToEntity(data);
    }
    async findByResearchId(researchId) {
        Logger_1.Logger.info('Obteniendo análisis de notas por research ID', { researchId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('research_id', researchId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener análisis de notas', { error: error.message });
            throw new Error(error.message);
        }
        return data.map(this.mapToEntity);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            researchId: data.research_id,
            analysisText: data.analysis_text,
            notesCount: data.notes_count,
            source: data.source,
            modelName: data.model_name,
            language: data.language,
            createdByUserId: data.created_by_user_id,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.ResearchNoteAnalysisRepository = ResearchNoteAnalysisRepository;
//# sourceMappingURL=ResearchNoteAnalysisRepository.js.map