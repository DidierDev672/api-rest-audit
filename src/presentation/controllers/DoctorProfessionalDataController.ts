import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import { DoctorRepository, DoctorProfessionalDataRepository } from '../../infrastructure/database';
import { CreateDoctorProfessionalDataSchema, UpdateDoctorProfessionalDataSchema } from '../dto';
import {
  CreateDoctorProfessionalDataUseCase,
  GetAllDoctorProfessionalDataUseCase,
  GetDoctorProfessionalDataByIdUseCase,
  GetDoctorProfessionalDataByDoctorIdUseCase,
  UpdateDoctorProfessionalDataUseCase,
  DeleteDoctorProfessionalDataUseCase,
} from '../../domain/usecases';
import { NotFoundAppError, ValidationAppError, ConflictAppError } from '../../infrastructure/middleware/errorHandler';

const repository = new DoctorProfessionalDataRepository();
const doctorRepository = new DoctorRepository();

export class DoctorProfessionalDataController {
  static async create(req: Request, res: Response) {
    try {
      Logger.info('DoctorProfessionalDataController.create - Solicitud recibida', { body: req.body });

      const data = CreateDoctorProfessionalDataSchema.parse(req.body);
      const useCase = new CreateDoctorProfessionalDataUseCase(repository, doctorRepository);
      const result = await useCase.execute({
        doctorId: data.id_doctor,
        professionalTitle: data.professional_title,
        university: data.university,
        country: data.country,
        graduationYear: data.graduation_year,
        professionalCardNumber: data.professional_card_number,
        rethusRegistration: data.rethus_registration,
        registrationStatus: data.registration_status,
        medicalSpecialty: data.medical_specialty,
        subspecialty: data.subspecialty,
        additionalCertifications: data.additional_certifications,
        diplomaUrl: data.diploma_url,
        degreeCertificateUrl: data.degree_certificate_url,
        specialtyCertificatesUrl: data.specialty_certificates_url,
      });

      Logger.success('DoctorProfessionalDataController.create - Datos profesionales creados', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('DoctorProfessionalDataController.create - Error de validación Zod', { errors: error.errors });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Ya existe') || errorMessage.includes('no encontrado')) {
        Logger.warning('DoctorProfessionalDataController.create - Conflicto', { error: errorMessage });
        throw new ConflictAppError(errorMessage);
      }

      Logger.danger('DoctorProfessionalDataController.create - Error interno', { error: errorMessage });
      throw error;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      Logger.info('DoctorProfessionalDataController.findAll - Solicitud recibida');

      const useCase = new GetAllDoctorProfessionalDataUseCase(repository);
      const result = await useCase.execute();

      Logger.success('DoctorProfessionalDataController.findAll - Datos obtenidos', { count: result.length });
      res.json(result);
    } catch (error) {
      Logger.danger('DoctorProfessionalDataController.findAll - Error', { error: (error as Error).message });
      throw error;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorProfessionalDataController.findById - Solicitud recibida', { id });

      const useCase = new GetDoctorProfessionalDataByIdUseCase(repository);
      const result = await useCase.execute(id);

      if (!result) {
        Logger.warning('DoctorProfessionalDataController.findById - No encontrado', { id });
        throw new NotFoundAppError(`Datos profesionales con ID ${id} no encontrados`);
      }

      Logger.success('DoctorProfessionalDataController.findById - Datos obtenidos', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorProfessionalDataController.findById - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorProfessionalDataController.findById - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByDoctorId(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      Logger.info('DoctorProfessionalDataController.findByDoctorId - Solicitud recibida', { doctorId });

      const useCase = new GetDoctorProfessionalDataByDoctorIdUseCase(repository);
      const result = await useCase.execute(doctorId);

      if (!result) {
        Logger.warning('DoctorProfessionalDataController.findByDoctorId - No encontrado', { doctorId });
        throw new NotFoundAppError(`Datos profesionales para médico con ID ${doctorId} no encontrados`);
      }

      Logger.success('DoctorProfessionalDataController.findByDoctorId - Datos obtenidos', { doctorId });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorProfessionalDataController.findByDoctorId - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorProfessionalDataController.findByDoctorId - Error', { error: errorMessage });
      throw error;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorProfessionalDataController.update - Solicitud recibida', { id, body: req.body });

      const data = UpdateDoctorProfessionalDataSchema.parse(req.body);
      const useCase = new UpdateDoctorProfessionalDataUseCase(repository, doctorRepository);

      const result = await useCase.execute(id, {
        professionalTitle: data.professional_title,
        university: data.university,
        country: data.country,
        graduationYear: data.graduation_year,
        professionalCardNumber: data.professional_card_number,
        rethusRegistration: data.rethus_registration,
        registrationStatus: data.registration_status,
        medicalSpecialty: data.medical_specialty,
        subspecialty: data.subspecialty,
        additionalCertifications: data.additional_certifications,
        diplomaUrl: data.diploma_url,
        degreeCertificateUrl: data.degree_certificate_url,
        specialtyCertificatesUrl: data.specialty_certificates_url,
        isVerified: data.is_verified,
      });

      Logger.success('DoctorProfessionalDataController.update - Datos actualizados', { id });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('DoctorProfessionalDataController.update - Error de validación Zod', { errors: error.errors });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorProfessionalDataController.update - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }
      if (errorMessage.includes('no encontrados')) {
        Logger.warning('DoctorProfessionalDataController.update - No encontrado', { error: errorMessage });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('DoctorProfessionalDataController.update - Error', { error: errorMessage });
      throw error;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('DoctorProfessionalDataController.delete - Solicitud recibida', { id });

      const useCase = new DeleteDoctorProfessionalDataUseCase(repository);
      await useCase.execute(id);

      Logger.success('DoctorProfessionalDataController.delete - Datos eliminados', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('DoctorProfessionalDataController.delete - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('DoctorProfessionalDataController.delete - Error', { error: errorMessage });
      throw error;
    }
  }
}
