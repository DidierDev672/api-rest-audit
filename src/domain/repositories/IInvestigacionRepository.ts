import { Investigacion } from '../entities';

export interface IInvestigacionRepository {
  create(data: Omit<Investigacion, 'createdAt' | 'updatedAt'>): Promise<Investigacion>;
  findAll(): Promise<Investigacion[]>;
  findById(id: string): Promise<Investigacion | null>;
  findAllById(id: string): Promise<Investigacion[] | null>;
  update(id_resource: string, data: Partial<Investigacion>): Promise<Investigacion>;
  delete(id_resource: string): Promise<void>;
}