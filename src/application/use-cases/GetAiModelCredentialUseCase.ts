import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import {
  AiModelCredentialResponse,
  toAiModelCredentialResponse,
} from '../../domain/entities/AiModelCredentialEntity';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class GetAiModelCredentialUseCase {
  constructor(
    private readonly repository: IAiModelCredentialRepository,
  ) {}

  async findAll(): Promise<AiModelCredentialResponse[]> {
    Logger.info('Obteniendo todas las credenciales de modelos IA');
    const items = await this.repository.findAll();
    return items.map(toAiModelCredentialResponse);
  }

  async findById(id: string): Promise<AiModelCredentialResponse> {
    Logger.info('Obteniendo credencial de modelo IA por ID', { id });

    const credential = await this.repository.findById(id);
    if (!credential) {
      throw new ValidationError(`Credencial con ID ${id} no encontrada`);
    }

    return toAiModelCredentialResponse(credential);
  }

  async findByOwnerId(ownerId: string): Promise<AiModelCredentialResponse[]> {
    Logger.info('Obteniendo credenciales de modelos IA por owner', { ownerId });
    const items = await this.repository.findByOwnerId(ownerId);
    return items.map(toAiModelCredentialResponse);
  }
}
