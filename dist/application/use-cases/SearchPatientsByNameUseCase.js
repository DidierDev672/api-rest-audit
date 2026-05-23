"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPatientsByNameUseCase = void 0;
class SearchPatientsByNameUseCase {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async execute(name) {
        const query = name.trim();
        if (query.length < 2) {
            return [];
        }
        const patients = await this.patientRepository.searchByName(query);
        return patients.map((p) => ({
            id: p.id,
            fullName: p.fullName,
            documentType: p.documentType,
            documentNumber: p.documentNumber,
            birthDate: p.birthDate.toISOString().slice(0, 10),
        }));
    }
}
exports.SearchPatientsByNameUseCase = SearchPatientsByNameUseCase;
//# sourceMappingURL=SearchPatientsByNameUseCase.js.map