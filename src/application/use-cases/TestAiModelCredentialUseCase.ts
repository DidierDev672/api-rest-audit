import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import {
  AiModelProviderRequirements,
  getProviderRequirements,
} from '../../domain/entities/AiModelCredentialEntity';
import { AiModelTesterGateway } from '../../infrastructure/clients/AiModelTesterGateway';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export interface AiModelTestResult {
  ok: boolean;
  provider: string;
  model: string | null;
  status_code: number | null;
  message: string;
  /** Presente solo cuando la prueba falla: qué necesita el modelo preferido. */
  requirements?: AiModelProviderRequirements;
}

/**
 * Prueba en vivo una credencial guardada. Si el modelo no funciona, devuelve
 * la información necesaria para configurar correctamente el proveedor.
 */
export class TestAiModelCredentialUseCase {
  constructor(
    private readonly repository: IAiModelCredentialRepository,
    private readonly tester: AiModelTesterGateway,
  ) {}

  async execute(id: string): Promise<AiModelTestResult> {
    const credential = await this.repository.findById(id);
    if (!credential) {
      throw new ValidationError(`Credencial con ID ${id} no encontrada`);
    }

    Logger.info('Probando credencial de modelo IA', {
      id,
      provider: credential.provider,
    });

    const outcome = await this.tester.test({
      provider: credential.provider,
      apiKey: credential.apiKey,
      model: credential.modelName,
      baseUrl: credential.baseUrl,
    });

    const result: AiModelTestResult = {
      ok: outcome.ok,
      provider: credential.provider,
      model: credential.modelName,
      status_code: outcome.statusCode,
      message: outcome.message,
    };

    if (!outcome.ok) {
      result.requirements = getProviderRequirements(credential.provider);
      Logger.warning('La prueba del modelo IA falló', { id, message: outcome.message });
    } else {
      Logger.success('La prueba del modelo IA fue exitosa', { id });
    }

    return result;
  }
}
