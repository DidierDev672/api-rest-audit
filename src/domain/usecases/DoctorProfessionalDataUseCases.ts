import { DoctorProfessionalData, DoctorCertification, RegistrationStatus } from '../entities';
import { IDoctorRepository, IDoctorProfessionalDataRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { DoctorValidator } from '../../infrastructure/validators/DoctorValidator';

export interface CreateDoctorProfessionalDataInput {
  doctorId: string;
  professionalTitle: string;
  university: string;
  country: string;
  graduationYear: number;
  professionalCardNumber: string;
  rethusRegistration: string;
  registrationStatus: RegistrationStatus;
  medicalSpecialty?: string;
  subspecialty?: string;
  additionalCertifications: DoctorCertification[];
  diplomaUrl?: string;
  degreeCertificateUrl?: string;
  specialtyCertificatesUrl: string[];
}

export class CreateDoctorProfessionalDataUseCase {
  constructor(
    private readonly repository: IDoctorProfessionalDataRepository,
    private readonly doctorRepository: IDoctorRepository
  ) {}

  async execute(data: CreateDoctorProfessionalDataInput): Promise<DoctorProfessionalData> {
    try {
      Logger.info('Iniciando creación de datos profesionales', { doctorId: data.doctorId });

      const doctorExists = await DoctorValidator.validateDoctorExists(data.doctorId, this.doctorRepository);
      if (!doctorExists) {
        throw new Error(`Médico con ID ${data.doctorId} no encontrado`);
      }

      const existingByRethus = await this.repository.findByRethusRegistration(data.rethusRegistration);
      if (existingByRethus) {
        throw new Error('Ya existe un registro con este número RETHUS');
      }

      const existingByCard = await this.repository.findByProfessionalCard(data.professionalCardNumber);
      if (existingByCard) {
        throw new Error('Ya existe un registro con este número de tarjeta profesional');
      }

      const result = await this.repository.create({
        doctorId: data.doctorId,
        professionalTitle: data.professionalTitle,
        university: data.university,
        country: data.country,
        graduationYear: data.graduationYear,
        professionalCardNumber: data.professionalCardNumber,
        rethusRegistration: data.rethusRegistration,
        registrationStatus: data.registrationStatus,
        medicalSpecialty: data.medicalSpecialty,
        subspecialty: data.subspecialty,
        additionalCertifications: data.additionalCertifications,
        diplomaUrl: data.diplomaUrl,
        degreeCertificateUrl: data.degreeCertificateUrl,
        specialtyCertificatesUrl: data.specialtyCertificatesUrl,
        isVerified: false,
      });

      Logger.success('Datos profesionales creados exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear datos profesionales', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllDoctorProfessionalDataUseCase {
  constructor(private readonly repository: IDoctorProfessionalDataRepository) {}

  async execute(): Promise<DoctorProfessionalData[]> {
    try {
      Logger.info('Obteniendo todos los datos profesionales');
      const result = await this.repository.findAll();
      Logger.success('Datos profesionales obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener datos profesionales', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetDoctorProfessionalDataByIdUseCase {
  constructor(private readonly repository: IDoctorProfessionalDataRepository) {}

  async execute(id: string): Promise<DoctorProfessionalData | null> {
    try {
      DoctorValidator.validateId(id, 'DoctorProfessionalData');
      Logger.info('Obteniendo datos profesionales por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Datos profesionales no encontrados', { id });
        return null;
      }

      Logger.success('Datos profesionales obtenidos', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener datos profesionales por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetDoctorProfessionalDataByDoctorIdUseCase {
  constructor(private readonly repository: IDoctorProfessionalDataRepository) {}

  async execute(doctorId: string): Promise<DoctorProfessionalData | null> {
    try {
      DoctorValidator.validateId(doctorId, 'Doctor');
      Logger.info('Obteniendo datos profesionales por ID de médico', { doctorId });

      const result = await this.repository.findByDoctorId(doctorId);

      if (!result) {
        Logger.warning('Datos profesionales no encontrados para el médico', { doctorId });
        return null;
      }

      Logger.success('Datos profesionales obtenidos', { doctorId });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener datos profesionales por ID de médico', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateDoctorProfessionalDataUseCase {
  constructor(
    private readonly repository: IDoctorProfessionalDataRepository,
    private readonly doctorRepository: IDoctorRepository
  ) {}

  async execute(id: string, data: Partial<DoctorProfessionalData>): Promise<DoctorProfessionalData> {
    try {
      DoctorValidator.validateId(id, 'DoctorProfessionalData');
      Logger.info('Actualizando datos profesionales', { id });

      const existing = await this.repository.findById(id);
      if (!existing) {
        throw new Error('Datos profesionales no encontrados');
      }

      const result = await this.repository.update(id, data);

      Logger.success('Datos profesionales actualizados', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar datos profesionales', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteDoctorProfessionalDataUseCase {
  constructor(private readonly repository: IDoctorProfessionalDataRepository) {}

  async execute(id: string): Promise<void> {
    try {
      DoctorValidator.validateId(id, 'DoctorProfessionalData');
      Logger.info('Eliminando datos profesionales', { id });

      await this.repository.delete(id);

      Logger.success('Datos profesionales eliminados', { id });
    } catch (error) {
      Logger.danger('Error al eliminar datos profesionales', { error: (error as Error).message });
      throw error;
    }
  }
}
