import { AiModelCredential } from '../entities/AiModelCredentialEntity';

export interface IAiModelCredentialRepository {
  create(data: AiModelCredential): Promise<void>;
  findById(id: string): Promise<AiModelCredential | null>;
  findAll(): Promise<AiModelCredential[]>;
  findByOwnerId(ownerId: string): Promise<AiModelCredential[]>;
  update(id: string, data: Partial<AiModelCredential>): Promise<AiModelCredential>;
  delete(id: string): Promise<void>;
  /** Desmarca como predeterminada cualquier credencial del usuario (uno por owner). */
  clearDefaultForOwner(ownerId: string, exceptId?: string): Promise<void>;
}
