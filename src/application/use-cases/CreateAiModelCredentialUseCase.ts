import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import {
  AiModelCredentialResponse,
  toAiModelCredentialResponse,
} from '../../domain/entities/AiModelCredentialEntity';
import { CreateAiModelCredentialDTO } from '../../presentation/dto/AiModelCredentialDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

export class CreateAiModelCredentialUseCase {
  constructor(
    private readonly repository: IAiModelCredentialRepository,
  ) {}

  async execute(data: CreateAiModelCredentialDTO): Promise<AiModelCredentialResponse> {
    const apiKey = data.api_key?.trim();
    if (!apiKey) {
      throw new ValidationError('La API key no puede estar vacía');
    }

    Logger.info('Creando credencial de modelo IA', {
      ownerId: data.owner_id,
      provider: data.provider,
    });

    const id = uuidv4();
    const now = new Date();
    const isDefault = data.is_default ?? false;

    const credential = {
      id,
      ownerId: data.owner_id.trim(),
      provider: data.provider,
      label: data.label ?? null,
      modelName: data.model_name ?? null,
      apiKey,
      baseUrl: data.base_url ?? null,
      isDefault,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    if (isDefault) {
      await this.repository.clearDefaultForOwner(credential.ownerId);
    }

    await this.repository.create(credential);

    Logger.success('Credencial de modelo IA creada', { id, provider: data.provider });

    return toAiModelCredentialResponse(credential);
  }
}
