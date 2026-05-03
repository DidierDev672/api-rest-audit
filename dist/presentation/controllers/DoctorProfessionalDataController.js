"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorProfessionalDataController = void 0;
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const usecases_1 = require("../../domain/usecases");
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const repository = new database_1.DoctorProfessionalDataRepository();
const doctorRepository = new database_1.DoctorRepository();
class DoctorProfessionalDataController {
    static async create(req, res) {
        try {
            Logger_1.Logger.info('DoctorProfessionalDataController.create - Solicitud recibida', { body: req.body });
            const data = dto_1.CreateDoctorProfessionalDataSchema.parse(req.body);
            const useCase = new usecases_1.CreateDoctorProfessionalDataUseCase(repository, doctorRepository);
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
            Logger_1.Logger.success('DoctorProfessionalDataController.create - Datos profesionales creados', { id: result.id });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.create - Error de validación Zod', { errors: error.errors });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('Ya existe') || errorMessage.includes('no encontrado')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.create - Conflicto', { error: errorMessage });
                throw new errorHandler_1.ConflictAppError(errorMessage);
            }
            Logger_1.Logger.danger('DoctorProfessionalDataController.create - Error interno', { error: errorMessage });
            throw error;
        }
    }
    static async findAll(req, res) {
        try {
            Logger_1.Logger.info('DoctorProfessionalDataController.findAll - Solicitud recibida');
            const useCase = new usecases_1.GetAllDoctorProfessionalDataUseCase(repository);
            const result = await useCase.execute();
            Logger_1.Logger.success('DoctorProfessionalDataController.findAll - Datos obtenidos', { count: result.length });
            res.json(result);
        }
        catch (error) {
            Logger_1.Logger.danger('DoctorProfessionalDataController.findAll - Error', { error: error.message });
            throw error;
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorProfessionalDataController.findById - Solicitud recibida', { id });
            const useCase = new usecases_1.GetDoctorProfessionalDataByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.findById - No encontrado', { id });
                throw new errorHandler_1.NotFoundAppError(`Datos profesionales con ID ${id} no encontrados`);
            }
            Logger_1.Logger.success('DoctorProfessionalDataController.findById - Datos obtenidos', { id });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.findById - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorProfessionalDataController.findById - Error', { error: errorMessage });
            throw error;
        }
    }
    static async findByDoctorId(req, res) {
        try {
            const { doctorId } = req.params;
            Logger_1.Logger.info('DoctorProfessionalDataController.findByDoctorId - Solicitud recibida', { doctorId });
            const useCase = new usecases_1.GetDoctorProfessionalDataByDoctorIdUseCase(repository);
            const result = await useCase.execute(doctorId);
            if (!result) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.findByDoctorId - No encontrado', { doctorId });
                throw new errorHandler_1.NotFoundAppError(`Datos profesionales para médico con ID ${doctorId} no encontrados`);
            }
            Logger_1.Logger.success('DoctorProfessionalDataController.findByDoctorId - Datos obtenidos', { doctorId });
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.findByDoctorId - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorProfessionalDataController.findByDoctorId - Error', { error: errorMessage });
            throw error;
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorProfessionalDataController.update - Solicitud recibida', { id, body: req.body });
            const data = dto_1.UpdateDoctorProfessionalDataSchema.parse(req.body);
            const useCase = new usecases_1.UpdateDoctorProfessionalDataUseCase(repository, doctorRepository);
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
            Logger_1.Logger.success('DoctorProfessionalDataController.update - Datos actualizados', { id });
            res.json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.update - Error de validación Zod', { errors: error.errors });
                throw new errorHandler_1.ValidationAppError('Datos de entrada inválidos', error.errors);
            }
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.update - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            if (errorMessage.includes('no encontrados')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.update - No encontrado', { error: errorMessage });
                throw new errorHandler_1.NotFoundAppError(errorMessage);
            }
            Logger_1.Logger.danger('DoctorProfessionalDataController.update - Error', { error: errorMessage });
            throw error;
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            Logger_1.Logger.info('DoctorProfessionalDataController.delete - Solicitud recibida', { id });
            const useCase = new usecases_1.DeleteDoctorProfessionalDataUseCase(repository);
            await useCase.execute(id);
            Logger_1.Logger.success('DoctorProfessionalDataController.delete - Datos eliminados', { id });
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                Logger_1.Logger.warning('DoctorProfessionalDataController.delete - ID inválido', { error: errorMessage });
                throw new errorHandler_1.ValidationAppError(errorMessage, []);
            }
            Logger_1.Logger.danger('DoctorProfessionalDataController.delete - Error', { error: errorMessage });
            throw error;
        }
    }
}
exports.DoctorProfessionalDataController = DoctorProfessionalDataController;
//# sourceMappingURL=DoctorProfessionalDataController.js.map