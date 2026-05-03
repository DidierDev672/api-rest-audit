"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDoctorUseCase = exports.UpdateDoctorUseCase = exports.GetDoctorByIdUseCase = exports.GetAllDoctorsUseCase = exports.CreateDoctorUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const DoctorValidator_1 = require("../../infrastructure/validators/DoctorValidator");
class CreateDoctorUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Iniciando creación de médico', { fullName: data.fullName });
            const existingByDocument = await this.repository.findByDocumentNumber(data.documentNumber);
            if (existingByDocument) {
                throw new Error('Ya existe un médico con este número de documento');
            }
            const existingByEmail = await this.repository.findByEmail(data.email);
            if (existingByEmail) {
                throw new Error('Ya existe un médico con este correo electrónico');
            }
            const result = await this.repository.create({
                documentType: data.documentType,
                documentNumber: data.documentNumber,
                fullName: data.fullName,
                birthDate: data.birthDate,
                gender: data.gender,
                email: data.email,
                phone: data.phone,
                address: data.address,
                isActive: true,
            });
            Logger_1.Logger.success('Médico creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear médico', { error: error.message });
            throw error;
        }
    }
}
exports.CreateDoctorUseCase = CreateDoctorUseCase;
class GetAllDoctorsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        try {
            Logger_1.Logger.info('Obteniendo todos los médicos');
            const result = await this.repository.findAll();
            Logger_1.Logger.success('Médicos obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener médicos', { error: error.message });
            throw error;
        }
    }
}
exports.GetAllDoctorsUseCase = GetAllDoctorsUseCase;
class GetDoctorByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id);
            Logger_1.Logger.info('Obteniendo médico por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Médico no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Médico obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener médico por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetDoctorByIdUseCase = GetDoctorByIdUseCase;
class UpdateDoctorUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id);
            Logger_1.Logger.info('Actualizando médico', { id });
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Médico actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar médico', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateDoctorUseCase = UpdateDoctorUseCase;
class DeleteDoctorUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            DoctorValidator_1.DoctorValidator.validateId(id);
            Logger_1.Logger.info('Eliminando médico', { id });
            await this.repository.delete(id);
            Logger_1.Logger.success('Médico eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar médico', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteDoctorUseCase = DeleteDoctorUseCase;
//# sourceMappingURL=DoctorUseCases.js.map