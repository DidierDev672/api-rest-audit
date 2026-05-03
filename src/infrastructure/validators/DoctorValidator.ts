import { Logger } from '../logger/Logger';
import { IdValidator } from './IdValidator';

export class DoctorValidator {
  static validateId(id: string, entityName: string = 'Doctor'): void {
    IdValidator.validate(id, entityName);
  }

  static async validateDoctorExists(
    doctorId: string,
    doctorRepository: any
  ): Promise<boolean> {
    try {
      Logger.info('Validando existencia de médico', { id: doctorId });
      const doctor = await doctorRepository.findById(doctorId);
      if (!doctor) {
        Logger.warning('Médico no encontrado', { id: doctorId });
        return false;
      }
      Logger.success('Médico validado', { id: doctorId });
      return true;
    } catch (error) {
      Logger.danger('Error al validar médico', { id: doctorId, error: (error as Error).message });
      throw error;
    }
  }

  static async validateDoctorProfessionalDataExists(
    professionalDataId: string,
    professionalDataRepository: any
  ): Promise<boolean> {
    try {
      Logger.info('Validando existencia de datos profesionales', { id: professionalDataId });
      const data = await professionalDataRepository.findById(professionalDataId);
      if (!data) {
        Logger.warning('Datos profesionales no encontrados', { id: professionalDataId });
        return false;
      }
      Logger.success('Datos profesionales validados', { id: professionalDataId });
      return true;
    } catch (error) {
      Logger.danger('Error al validar datos profesionales', { id: professionalDataId, error: (error as Error).message });
      throw error;
    }
  }
}
