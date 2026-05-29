import { IPatientLoginRepository } from '../repositories';
import { PatientLogin, PermitRole } from '../entities';
export interface RegisterPatientLoginData {
    idPatient: string;
    email: string;
    username: string;
    password: string;
    permits?: PermitRole[];
    hasConsent: boolean;
}
export interface LoginData {
    email?: string;
    username?: string;
    password: string;
}
export interface LoginResult {
    patientLogin: Omit<PatientLogin, 'password'>;
    token: string;
}
export declare class RegisterPatientLoginUseCase {
    private readonly repository;
    constructor(repository: IPatientLoginRepository);
    execute(data: RegisterPatientLoginData): Promise<Omit<PatientLogin, 'password'>>;
    private hashPassword;
}
export declare class LoginPatientUseCase {
    private readonly repository;
    constructor(repository: IPatientLoginRepository);
    execute(data: LoginData): Promise<LoginResult>;
    private verifyPassword;
    /** Token almacenado existe en BD y pertenece al mismo usuario. */
    private isStoredTokenValid;
    /**
     * Primera sesión (sin token en BD): genera y persiste un token nuevo.
     * Sesiones posteriores: reutiliza el token si sigue siendo válido; si no, genera uno nuevo.
     */
    private ensureSessionToken;
    private generateToken;
}
export declare class LogoutPatientUseCase {
    private readonly repository;
    constructor(repository: IPatientLoginRepository);
    execute(token: string): Promise<void>;
}
export declare class ValidateTokenUseCase {
    private readonly repository;
    constructor(repository: IPatientLoginRepository);
    execute(token: string): Promise<Omit<PatientLogin, 'password'> | null>;
}
//# sourceMappingURL=PatientLoginUseCases.d.ts.map