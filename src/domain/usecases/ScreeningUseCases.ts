import { Screening, Question } from "../entities";
import { IScreeningRepository } from "../repositories";
import { Logger } from "../../infrastructure/logger/Logger";
import { IdValidator } from "../../infrastructure/validators/IdValidator";

export class CreateScreeningUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(data: {
    title: string;
    description: string;
    questions: Question[];
  }): Promise<Screening> {
    try {
      Logger.info("Creando tamizaje", { title: data.title });

      const result = await this.repository.create(data);

      Logger.success("Tamizaje creado exitosamente", { id: result.id });
      return result;
    } catch (error) {
      Logger.danger("Error al crear tamizaje", {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetAllScreeningsUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(): Promise<Screening[]> {
    try {
      Logger.info("Obteniendo todos los tamizajes");

      const result = await this.repository.findAll();

      Logger.success("Tamizajes obtenidos", { count: result.length });
      return result;
    } catch (error) {
      Logger.danger("Error al obtener tamizajes", {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetScreeningByIdUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(id: string): Promise<Screening | null> {
    try {
      IdValidator.validate(id, "screening");
      Logger.info("Obteniendo tamizaje por ID", { id });

      const result = await this.repository.findById(id);


      if (!result) {
        Logger.warning("Tamizaje no encontrado", { id });
        return null;
      }
      
      Logger.success("Tamizaje obtenido", { id });
      return result;
    } catch (error) {
      Logger.danger("Error al obtener tamizaje por ID", {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateScreeningUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(id: string, data: Partial<Screening>): Promise<Screening> {
    try {
      IdValidator.validate(id, "Screening");
      Logger.info("Actualizando tamizaje", { id });

      const result = await this.repository.update(id, data);

      Logger.success("Tamizaje actualizado", { id });
      return result;
    } catch (error) {
      Logger.danger("Error al actualizar tamizaje", {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeleteScreeningUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, "Screening");
      Logger.info("Eliminando tamizaje", { id });

      await this.repository.delete(id);

      Logger.success("Tamizaje eliminado", { id });
    } catch (error) {
      Logger.danger("Error al eliminar tamizaje", {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
