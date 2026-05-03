import { Entity } from './index';

export type PermitRole = 'patient' | 'user' | 'doctor' | 'administrator' | 'super_administrator';

export interface PatientLogin extends Entity {
  idPatient: string;
  email: string;
  username: string;
  password: string;
  permits: PermitRole[];
  token: string | null;
  hasConsent: boolean;
}

export interface PatientLoginWithPlainPassword extends Omit<PatientLogin, 'password'> {
  plainPassword?: string;
}
