/**
 * Validator for Screening Response
 * Validates the required fields for storing tamizaje responses
 */
export declare class ScreeningResponseValidator {
    /**
     * Validate required fields: id_patient, id_screening, options_answer
     */
    static validate(data: any): {
        valid: boolean;
        errors: string[];
    };
    /**
     * Validate UUID format (simple validation)
     */
    private static isValidUUID;
    /**
     * Validate partial update (all fields optional)
     */
    static validatePartial(data: any): {
        valid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=ScreeningResponseValidator.d.ts.map