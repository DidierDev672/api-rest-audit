import { Investigacion } from '../entities';

export interface IInvestigacionRepository {
  create(data: Omit<Investigacion, 'createdAt' | 'updatedAt'>): Promise<Investigacion>;
  findAll(): Promise<Investigacion[]>;
  findById(id: string): Promise<Investigacion | null>;
}