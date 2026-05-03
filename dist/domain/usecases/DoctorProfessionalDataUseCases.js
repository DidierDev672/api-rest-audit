"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDoctorProfessionalDataUseCase = exports.UpdateDoctorProfessionalDataUseCase = exports.GetDoctorProfessionalDataByDoctorIdUseCase = exports.GetDoctorProfessionalDataByIdUseCase = exports.GetAllDoctorProfessionalDataUseCase = exports.CreateDoctorProfessionalDataUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const DoctorValidator_1 = require("../../infrastructure/validators/DoctorValidator");
class CreateDoctorProfessionalDataUseCase {
    constructor(repository, doctorRepository) {
        this.repository = repository;
        this.doctorRepository = doctorRepository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de datos profesionales', { doctorId: data.doctorId });
            const doctorExists = await DoctorValidator_1.DoctorValidator.validateDoctorExists(data.doctorId, this.doctorRepository);
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
            Logger_1.Logger.success('Datos profesionales creados exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear datos profesionales', { error: error.message });
            throw error;
        }
    }
}
exports.CreateDoctorProfessionalDataUseCase = CreateDoctorProfessionalDataUseCase;
class GetAllDoctorProfessionalDataUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los datos profesionales');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Datos profesionales obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener datos profesionales', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllDoctorProfessionalDataUseCase = GetAllDoctorProfessionalDataUseCase;
class GetDoctorProfessionalDataByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id, 'DoctorProfessionalData');
            Logger_1.Logger.info('Obteniendo datos profesionales por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Datos profesionales no encontrados', { id });
                return null;
            }
            Logger_1.Logger.success('Datos profesionales obtenidos', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener datos profesionales por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetDoctorProfessionalDataByIdUseCase = GetDoctorProfessionalDataByIdUseCase;
class GetDoctorProfessionalDataByDoctorIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(doctorId) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(doctorId, 'Doctor');
            Logger_1.Logger.info('Obteniendo datos profesionales por ID de médico', { doctorId });
            const result = await this.repository.findByDoctorId(doctorId);
            if (!result) {
                Logger_1.Logger.warning('Datos profesionales no encontrados para el médico', { doctorId });
                return null;
            }
            Logger_1.Logger.success('Datos profesionales obtenidos', { doctorId });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener datos profesionales por ID de médico', { error: error.message });
            throw error;
        }
    }
}
exports.GetDoctorProfessionalDataByDoctorIdUseCase = GetDoctorProfessionalDataByDoctorIdUseCase;
class UpdateDoctorProfessionalDataUseCase {
    constructor(repository, doctorRepository) {
        this.repository = repository;
        this.doctorRepository = doctorRepository;
    }
    async execute(id, data) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id, 'DoctorProfessionalData');
            Logger_1.Logger.info('Actualizando datos profesionales', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Datos profesionales no encontrados');
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Datos profesionales actualizados', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar datos profesionales', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateDoctorProfessionalDataUseCase = UpdateDoctorProfessionalDataUseCase;
class DeleteDoctorProfessionalDataUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id, 'DoctorProfessionalData');
            Logger_1.Logger.info('Eliminando datos profesionales', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Datos profesionales eliminados', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar datos profesionales', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteDoctorProfessionalDataUseCase = DeleteDoctorProfessionalDataUseCase;
//# sourceMappingURL=DoctorProfessionalDataUseCases.js.map