import { PatientLogin, PermitRole } from '../entities';

export interface CreatePatientLoginData {
  idPatient: string;
  email: string;
  username: string;
  password: string;
  permits: PermitRole[];
  hasConsent: boolean;
}

export interface IPatientLoginRepository {
  create(data: CreatePatientLoginData): Promise<PatientLogin>;
  findByEmail(email: string): Promise<PatientLogin | null>;
  findByUsername(username: string): Promise<PatientLogin | null>;
  findByIdPatient(idPatient: string): Promise<PatientLogin | null>;
  updateToken(id: string, token: string): Promise<PatientLogin>;
  clearToken(id: string): Promise<void>;
  findByToken(token: string): Promise<PatientLogin | null>;
}
