import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import {
  AiDocumentUpload,
  CreateAiDocumentUploadInput,
} from '../../domain/entities/AiDocumentUploadEntity';
import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
import { Logger } from '../logger/Logger';

const BUCKET = 'ai-documents';
const TABLE = 'ai_document_uploads';
const ANALYSIS_TABLE = 'ai_document_analysis';

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w.-]+/g, '_');
}

export class AiDocumentUploadRepository implements IAiDocumentUploadRepository {
  async create(input: CreateAiDocumentUploadInput): Promise<AiDocumentUpload> {
    const id = uuidv4();
    const safeName = sanitizeFilename(input.originalFilename);
    const storageObjectPath = `${id}/${safeName}`;

    const { error: uploadError } = await supabase
      .getClient()
      .storage.from(BUCKET)
      .upload(storageObjectPath, input.fileBuffer, {
        contentType: input.mimeType,
        upsert: false,
        cacheControl: '3600',
      });

    if (uploadError) {
      Logger.danger('Error subiendo documento a Storage', { error: uploadError.message });
      throw new Error(uploadError.message);
    }

    const now = new Date().toISOString();
    const row = this.buildInsertRow({
      id,
      storageObjectPath,
      input,
      now,
    });

    let { data, error } = await supabase
      .from(TABLE)
      .insert(row)
      .select()
      .single();

    if (
      error?.message?.includes("patient_birth_date") &&
      "patient_birth_date" in row
    ) {
      Logger.warning(
        "Columna patient_birth_date ausente; reintento sin fecha de nacimiento. Ejecuta supabase/migrations/004_ai_document_uploads_patient_columns.sql",
      );
      const { patient_birth_date: _omit, ...rowSinFecha } = row;
      ({ data, error } = await supabase
        .from(TABLE)
        .insert(rowSinFecha)
        .select()
        .single());
    }

    if (error) {
      await supabase.getClient().storage.from(BUCKET).remove([storageObjectPath]);
      Logger.danger('Error insertando ai_document_uploads', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findAll(): Promise<AiDocumentUpload[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((row: Record<string, unknown>) => this.mapToEntity(row));
  }

  async findById(id: string): Promise<AiDocumentUpload | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async queueAnalysis(documentUploadId: string): Promise<{ id: string }> {
    const analysisId = uuidv4();
    const now = new Date().toISOString();

    const { error } = await supabase.from(ANALYSIS_TABLE).insert({
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

  private buildInsertRow(params: {
    id: string;
    storageObjectPath: string;
    input: CreateAiDocumentUploadInput;
    now: string;
  }): Record<string, unknown> {
    const { id, storageObjectPath, input, now } = params;
    const row: Record<string, unknown> = {
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

  private mapToEntity(data: Record<string, unknown>): AiDocumentUpload {
    return {
      id: String(data.id),
      storageBucket: String(data.storage_bucket ?? BUCKET),
      storageObjectPath: String(data.storage_object_path),
      originalFilename: String(data.original_filename),
      mimeType: String(data.mime_type),
      fileSizeBytes:
        data.file_size_bytes != null ? Number(data.file_size_bytes) : null,
      fileType: data.file_type as AiDocumentUpload['fileType'],
      clientUserId:
        data.client_user_id != null ? String(data.client_user_id) : null,
      patientId: data.patient_id != null ? String(data.patient_id) : null,
      patientName: String(data.patient_name ?? ''),
      patientDocumentType:
        data.patient_document_type != null
          ? String(data.patient_document_type)
          : null,
      patientDocumentNumber:
        data.patient_document_number != null
          ? String(data.patient_document_number)
          : null,
      patientBirthDate:
        data.patient_birth_date != null
          ? String(data.patient_birth_date)
          : null,
      status: String(data.status ?? 'uploaded'),
      createdAt: new Date(String(data.created_at)),
      updatedAt: new Date(String(data.updated_at)),
    };
  }
}
