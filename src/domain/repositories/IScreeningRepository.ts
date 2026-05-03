import { Screening } from '../entities';

export interface IScreeningRepository {
  create(screening: Omit<Screening, 'id' | 'createdAt' | 'updatedAt' | 'optionsAnswer'>): Promise<Screening>;
  findAll(): Promise<Screening[]>;
  findById(id: string): Promise<Screening | null>;
  update(id: string, screening: Partial<Screening>): Promise<Screening>;
  delete(id: string): Promise<void>;
}
