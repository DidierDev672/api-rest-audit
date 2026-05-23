import { IPatientRepository } from '../../domain/repositories/IPatientRepository';

export class SearchPatientsByNameUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(name: string) {
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
