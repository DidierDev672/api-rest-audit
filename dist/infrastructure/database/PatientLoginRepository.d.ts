import { PatientLogin } from '../../domain/entities';
import { IPatientLoginRepository, CreatePatientLoginData } from '../../domain/repositories';
export declare class PatientLoginRepository implements IPatientLoginRepository {
    private readonly table;
    create(data: CreatePatientLoginData): Promise<PatientLogin>;
    findByEmail(email: string): Promise<PatientLogin | null>;
    findByUsername(username: string): Promise<PatientLogin | null>;
    findByIdPatient(idPatient: string): Promise<PatientLogin | null>;
    updateToken(id: string, token: string): Promise<PatientLogin>;
    clearToken(id: string): Promise<void>;
    findByToken(token: string): Promise<PatientLogin | null>;
    private mapToEntity;
}
//# sourceMappingURL=PatientLoginRepository.d.ts.map