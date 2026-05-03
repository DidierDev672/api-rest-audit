import { RelaxingSound } from '../entities';

export interface IRelaxingSoundRepository {
  create(sound: Omit<RelaxingSound, 'id' | 'createdAt' | 'updatedAt'>): Promise<RelaxingSound>;
  findAll(): Promise<RelaxingSound[]>;
  findById(id: string): Promise<RelaxingSound | null>;
  update(id: string, sound: Partial<RelaxingSound>): Promise<RelaxingSound>;
  delete(id: string): Promise<void>;
}
