/**
 * Use Cases - Screening Response
 * Business logic for tamizaje responses
 */
export declare const ScreeningResponseUseCases: {
    /**
     * Create a new screening response
     */
    create(data: {
        id_patient: string;
        id_screening: string;
        options_answer: Array<{
            id: string;
            text: string;
            value: number;
        }>;
    }): Promise<any>;
    /**
     * Get screening response by ID
     */
    getById(id: string): Promise<any | null>;
    /**
     * Get all responses for a patient
     */
    getByPatient(patientId: string): Promise<any[]>;
    /**
     * Get all responses for a screening
     */
    getByScreening(screeningId: string): Promise<any[]>;
    /**
     * Update a screening response
     */
    update(id: string, data: {
        options_answer?: Array<{
            id: string;
            text: string;
            value: number;
        }>;
    }): Promise<any>;
    /**
     * Delete a screening response
     */
    delete(id: string): Promise<void>;
    /**
     * Get all screening responses
     */
    getAll(): Promise<any[]>;
};
//# sourceMappingURL=ScreeningResponseUseCases.d.ts.map