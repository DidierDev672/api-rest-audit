"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNoteRepository = void 0;
const supabase_1 = require("../database/supabase");
const Logger_1 = require("../logger/Logger");
class ResearchNoteRepository {
    constructor() {
        this.table = 'research_notes';
    }
    async createMany(notes) {
        Logger_1.Logger.info('Creando notas de investigacion en batch', { count: notes.length });
        const insertData = notes.map(note => ({
            research_id: note.researchId,
            id_note: note.idNote,
            text: note.text,
            color: note.color,
            color_name: note.colorName,
            source_message_index: note.sourceMessageIndex,
            source_content: note.sourceContent,
        }));
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .insert(insertData)
            .select();
        if (error) {
            Logger_1.Logger.danger('Error al crear notas de investigacion', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de investigacion creadas', { count: data.length });
        return data.map(this.mapToEntity);
    }
    async findByResearchId(researchId) {
        Logger_1.Logger.info('Obteniendo notas por research ID', { researchId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('research_id', researchId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener notas de investigacion', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de investigacion obtenidas', { count: data.length });
        return data.map(this.mapToEntity);
    }
    async deleteByResearchId(researchId) {
        Logger_1.Logger.info('Eliminando notas por research ID', { researchId });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('research_id', researchId);
        if (error) {
            Logger_1.Logger.danger('Error al eliminar notas de investigacion', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de investigacion eliminadas');
    }
    mapToEntity(data) {
        return {
            researchId: data.research_id,
            idNote: data.id_note,
            text: data.text,
            color: data.color,
            colorName: data.color_name,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            sourceMessageIndex: data.source_message_index,
            sourceContent: data.source_content,
        };
    }
}
exports.ResearchNoteRepository = ResearchNoteRepository;
//# sourceMappingURL=ResearchNoteRepository.js.map