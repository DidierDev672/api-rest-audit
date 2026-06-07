import { supabase } from './supabase';
import {
  AiModelCredential,
  AiModelProvider,
} from '../../domain/entities/AiModelCredentialEntity';
import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import { Logger } from '../logger/Logger';

export class AiModelCredentialRepository
  implements IAiModelCredentialRepository
{
  private readonly table = 'ai_model_credentials';

  async create(data: AiModelCredential): Promise<void> {
    Logger.info('Creando credencial de modelo IA', {
      id: data.id,
      ownerId: data.ownerId,
    });

    const { error } = await supabase.from(this.table).insert({
      id: data.id,
      owner_id: data.ownerId,
      provider: data.provider,
      label: data.label,
      model_name: data.modelName,
      api_key: data.apiKey,
      base_url: data.baseUrl,
      is_default: data.isDefault,
      is_active: data.isActive,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
    });

    if (error) {
      Logger.danger('Error al crear credencial de modelo IA', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Credencial de modelo IA creada en base de datos');
  }

  async findById(id: string): Promise<AiModelCredential | null> {
    Logger.info('Obteniendo credencial de modelo IA por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      Logger.danger('Error al obtener credencial de modelo IA', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findAll(): Promise<AiModelCredential[]> {
    Logger.info('Obteniendo todas las credenciales de modelos IA');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener credenciales de modelos IA', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async findByOwnerId(ownerId: string): Promise<AiModelCredential[]> {
    Logger.info('Obteniendo credenciales de modelos IA por owner', { ownerId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('owner_id', ownerId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener credenciales por owner', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async update(
    id: string,
    data: Partial<AiModelCredential>,
  ): Promise<AiModelCredential> {
    Logger.info('Actualizando credencial de modelo IA', { id });

    const dbData: Record<string, unknown> = {};
    if (data.provider !== undefined) dbData.provider = data.provider;
    if (data.label !== undefined) dbData.label = data.label;
    if (data.modelName !== undefined) dbData.model_name = data.modelName;
    if (data.apiKey !== undefined) dbData.api_key = data.apiKey;
    if (data.baseUrl !== undefined) dbData.base_url = data.baseUrl;
    if (data.isDefault !== undefined) dbData.is_default = data.isDefault;
    if (data.isActive !== undefined) dbData.is_active = data.isActive;
    if (data.updatedAt !== undefined) dbData.updated_at = data.updatedAt.toISOString();

    const { data: updated, error } = await supabase
      .from(this.table)
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar credencial de modelo IA', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando credencial de modelo IA', { id });

    const { error } = await supabase.from(this.table).delete().eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar credencial de modelo IA', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Credencial de modelo IA eliminada de base de datos');
  }

  async clearDefaultForOwner(ownerId: string, exceptId?: string): Promise<void> {
    Logger.info('Restableciendo credencial predeterminada del owner', { ownerId, exceptId });

    let query = supabase
      .from(this.table)
      .update({ is_default: false })
      .eq('owner_id', ownerId)
      .eq('is_default', true);

    if (exceptId) {
      query = query.neq('id', exceptId);
    }

    const { error } = await query;

    if (error) {
      Logger.danger('Error al restablecer credencial predeterminada', { error: error.message });
      throw new Error(error.message);
    }
  }

  private mapToEntity(data: any): AiModelCredential {
    return {
      id: data.id,
      ownerId: data.owner_id,
      provider: data.provider as AiModelProvider,
      label: data.label ?? null,
      modelName: data.model_name ?? null,
      apiKey: data.api_key ?? '',
      baseUrl: data.base_url ?? null,
      isDefault: data.is_default ?? false,
      isActive: data.is_active ?? true,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
