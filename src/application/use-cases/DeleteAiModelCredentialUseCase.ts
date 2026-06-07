import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class DeleteAiModelCredentialUseCase {
  constructor(
    private readonly repository: IAiModelCredentialRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Credencial con ID ${id} no encontrada`);
    }

    Logger.info('Eliminando credencial de modelo IA', { id });

    await this.repository.delete(id);

    Logger.success('Credencial de modelo IA eliminada', { id });
  }
}
