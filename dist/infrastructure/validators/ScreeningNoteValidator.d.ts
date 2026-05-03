export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare class NotFoundError extends Error {
    constructor(message: string);
}
export declare class ConflictError extends Error {
    constructor(message: string);
}
export declare class EntityNotFoundError extends Error {
    constructor(entityName: string, id: string);
}
export declare class ScreeningNoteValidator {
    static validateId(id: string, entityName: string): void;
    static validatePatientExists(patientId: string, patientRepository: any): Promise<boolean>;
    static validateScreeningExists(screeningId: string, screeningRepository: any): Promise<boolean>;
    static validatePatientAndScreening(patientId: string, screeningId: string, patientRepository: any, screeningRepository: any): Promise<{
        patientExists: boolean;
        screeningExists: boolean;
    }>;
}
//# sourceMappingURL=ScreeningNoteValidator.d.ts.map