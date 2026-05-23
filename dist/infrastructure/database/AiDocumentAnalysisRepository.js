"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDocumentAnalysisRepository = void 0;
const supabase_1 = require("./supabase");
const Logger_1 = require("../logger/Logger");
class AiDocumentAnalysisRepository {
    constructor() {
        this.table = 'ai_document_analyses';
    }
    async create(data) {
        Logger_1.Logger.info('Creando análisis de documento AI', { id: data.id, documentUploadId: data.documentUploadId });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id: data.id,
            document_upload_id: data.documentUploadId,
            content: data.content,
            model: data.model,
            analysis_id: data.analysisId,
            created_at: data.createdAt.toISOString(),
            updated_at: data.updatedAt.toISOString(),
        });
        if (error) {
            Logger_1.Logger.danger('Error al crear análisis de documento AI', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Análisis de documento AI creado en base de datos');
    }
    async findById(id) {
        Logger_1.Logger.info('Obteniendo análisis de documento AI por ID', { id });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116')
                return null;
            Logger_1.Logger.danger('Error al obtener análisis de documento AI', { error: error.message });
            throw new Error(error.message);
        }
        return this.mapToEntity(data);
    }
    async findAll() {
        Logger_1.Logger.info('Obteniendo todos los análisis de documentos AI');
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener análisis de documentos AI', { error: error.message });
            throw new Error(error.message);
        }
        return data.map(this.mapToEntity);
    }
    async findByDocumentUploadId(documentUploadId) {
        Logger_1.Logger.info('Obteniendo análisis por documentUploadId', { documentUploadId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('document_upload_id', documentUploadId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener análisis por documentUploadId', { error: error.message });
            throw new Error(error.message);
        }
        return data.map(this.mapToEntity);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            documentUploadId: data.document_upload_id,
            content: data.content,
            model: data.model,
            analysisId: data.analysis_id ?? null,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.AiDocumentAnalysisRepository = AiDocumentAnalysisRepository;
//# sourceMappingURL=AiDocumentAnalysisRepository.js.map