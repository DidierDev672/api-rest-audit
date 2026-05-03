export declare class DoctorValidator {
    static validateId(id: string, entityName?: string): void;
    static validateDoctorExists(doctorId: string, doctorRepository: any): Promise<boolean>;
    static validateDoctorProfessionalDataExists(professionalDataId: string, professionalDataRepository: any): Promise<boolean>;
}
//# sourceMappingURL=DoctorValidator.d.ts.map