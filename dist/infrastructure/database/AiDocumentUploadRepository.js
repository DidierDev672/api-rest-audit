"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiDocumentUploadRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
const Logger_1 = require("../logger/Logger");
const BUCKET = 'ai-documents';
const TABLE = 'ai_document_uploads';
const ANALYSIS_TABLE = 'ai_document_analysis';
function sanitizeFilename(name) {
    return name.replace(/[^\w.-]+/g, '_');
}
class AiDocumentUploadRepository {
    async create(input) {
        const id = (0, uuid_1.v4)();
        const safeName = sanitizeFilename(input.originalFilename);
        const storageObjectPath = `${id}/${safeName}`;
        const { error: uploadError } = await supabase_1.supabase
            .getClient()
            .storage.from(BUCKET)
            .upload(storageObjectPath, input.fileBuffer, {
            contentType: input.mimeType,
            upsert: false,
            cacheControl: '3600',
        });
        if (uploadError) {
            Logger_1.Logger.danger('Error subiendo documento a Storage', { error: uploadError.message });
            throw new Error(uploadError.message);
        }
        const now = new Date().toISOString();
        const row = this.buildInsertRow({
            id,
            storageObjectPath,
            input,
            now,
        });
        let { data, error } = await supabase_1.supabase
            .from(TABLE)
            .insert(row)
            .select()
            .single();
        if (error?.message?.includes("patient_birth_date") &&
            "patient_birth_date" in row) {
            Logger_1.Logger.warning("Columna patient_birth_date ausente; reintento sin fecha de nacimiento. Ejecuta supabase/migrations/004_ai_document_uploads_patient_columns.sql");
            const { patient_birth_date: _omit, ...rowSinFecha } = row;
            ({ data, error } = await supabase_1.supabase
                .from(TABLE)
                .insert(rowSinFecha)
                .select()
                .single());
        }
        if (error) {
            await supabase_1.supabase.getClient().storage.from(BUCKET).remove([storageObjectPath]);
            Logger_1.Logger.danger('Error insertando ai_document_uploads', { error: error.message });
            throw new Error(error.message);
        }
        return this.mapToEntity(data);
    }
    async findAll() {
        const { data, error } = await supabase_1.supabase
            .from(TABLE)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return (data ?? []).map((row) => this.mapToEntity(row));
    }
    async findById(id) {
        const { data, error } = await supabase_1.supabase
            .from(TABLE)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            if (error.code === 'PGRST116')
                return null;
            throw new Error(error.message);
        }
        return this.mapToEntity(data);
    }
    async queueAnalysis(documentUploadId) {
        const analysisId = (0, uuid_1.v4)();
        const now = new Date().toISOString();
        const { error } = await supabase_1.supabase.from(ANALYSIS_TABLE).insert({
            id: analysisId,
            document_upload_id: documentUploadId,
            status: 'pending',
            raw_response: {},
            created_at: now,
            updated_at: now,
        });
        if (error) {
            throw new Error(error.message);
        }
        return { id: analysisId };
    }
    buildInsertRow(params) {
        const { id, storageObjectPath, input, now } = params;
        const row = {
            id,
            storage_bucket: BUCKET,
            storage_object_path: storageObjectPath,
            original_filename: input.originalFilename,
            mime_type: input.mimeType,
            file_size_bytes: input.fileSizeBytes,
            file_type: input.fileType,
            client_user_id: input.clientUserId,
            patient_id: input.patientId,
            patient_name: input.patientName,
            patient_document_type: input.patientDocumentType,
            patient_document_number: input.patientDocumentNumber,
            status: 'uploaded',
            created_at: now,
            updated_at: now,
        };
        if (input.patientBirthDate) {
            row.patient_birth_date = input.patientBirthDate;
        }
        return row;
    }
    mapToEntity(data) {
        return {
            id: String(data.id),
            storageBucket: String(data.storage_bucket ?? BUCKET),
            storageObjectPath: String(data.storage_object_path),
            originalFilename: String(data.original_filename),
            mimeType: String(data.mime_type),
            fileSizeBytes: data.file_size_bytes != null ? Number(data.file_size_bytes) : null,
            fileType: data.file_type,
            clientUserId: data.client_user_id != null ? String(data.client_user_id) : null,
            patientId: data.patient_id != null ? String(data.patient_id) : null,
            patientName: String(data.patient_name ?? ''),
            patientDocumentType: data.patient_document_type != null
                ? String(data.patient_document_type)
                : null,
            patientDocumentNumber: data.patient_document_number != null
                ? String(data.patient_document_number)
                : null,
            patientBirthDate: data.patient_birth_date != null
                ? String(data.patient_birth_date)
                : null,
            status: String(data.status ?? 'uploaded'),
            createdAt: new Date(String(data.created_at)),
            updatedAt: new Date(String(data.updated_at)),
        };
    }
}
exports.AiDocumentUploadRepository = AiDocumentUploadRepository;
//# sourceMappingURL=AiDocumentUploadRepository.js.map