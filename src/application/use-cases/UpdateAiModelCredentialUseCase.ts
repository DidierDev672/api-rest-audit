import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import {
  AiModelCredential,
  AiModelCredentialResponse,
  toAiModelCredentialResponse,
} from '../../domain/entities/AiModelCredentialEntity';
import { UpdateAiModelCredentialDTO } from '../../presentation/dto/AiModelCredentialDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class UpdateAiModelCredentialUseCase {
  constructor(
    private readonly repository: IAiModelCredentialRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateAiModelCredentialDTO,
  ): Promise<AiModelCredentialResponse> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Credencial con ID ${id} no encontrada`);
    }

    const provider = data.provider ?? existing.provider;
    const baseUrl =
      data.base_url !== undefined ? data.base_url : existing.baseUrl;
    const label = data.label !== undefined ? data.label : existing.label;

    if (provider === 'other' && (!baseUrl || !label)) {
      throw new ValidationError(
        'base_url y label son requeridos cuando provider es "other"',
      );
    }

    Logger.info('Actualizando credencial de modelo IA', { id });

    const patch: Partial<AiModelCredential> = {
      provider,
      baseUrl,
      label,
      modelName:
        data.model_name !== undefined ? data.model_name : existing.modelName,
      apiKey: data.api_key !== undefined ? data.api_key.trim() : existing.apiKey,
      isDefault: data.is_default !== undefined ? data.is_default : existing.isDefault,
      isActive: data.is_active !== undefined ? data.is_active : existing.isActive,
      updatedAt: new Date(),
    };

    if (data.is_default === true) {
      await this.repository.clearDefaultForOwner(existing.ownerId, id);
    }

    const updated = await this.repository.update(id, patch);

    Logger.success('Credencial de modelo IA actualizada', { id });

    return toAiModelCredentialResponse(updated);
  }
}
