"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorValidator = void 0;
const Logger_1 = require("../logger/Logger");
const IdValidator_1 = require("./IdValidator");
class DoctorValidator {
    static validateId(id, entityName = 'Doctor') {
        IdValidator_1.IdValidator.validate(id, entityName);
    }
    static async validateDoctorExists(doctorId, doctorRepository) {
        try {
            Logger_1.Logger.info('Validando existencia de médico', { id: doctorId });
            const doctor = await doctorRepository.findById(doctorId);
            if (!doctor) {
                Logger_1.Logger.warning('Médico no encontrado', { id: doctorId });
                return false;
            }
            Logger_1.Logger.success('Médico validado', { id: doctorId });
            return true;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al validar médico', { id: doctorId, error: error.message });
            throw error;
        }
    }
    static async validateDoctorProfessionalDataExists(professionalDataId, professionalDataRepository) {
        try {
            Logger_1.Logger.info('Validando existencia de datos profesionales', { id: professionalDataId });
            const data = await professionalDataRepository.findById(professionalDataId);
            if (!data) {
                Logger_1.Logger.warning('Datos profesionales no encontrados', { id: professionalDataId });
                return false;
            }
            Logger_1.Logger.success('Datos profesionales validados', { id: professionalDataId });
            return true;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al validar datos profesionales', { id: professionalDataId, error: error.message });
            throw error;
        }
    }
}
exports.DoctorValidator = DoctorValidator;
//# sourceMappingURL=DoctorValidator.js.map