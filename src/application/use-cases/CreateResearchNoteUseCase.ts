import { ResearchNoteRepository } from '../../domain/repositories/ResearchNoteRepository';
import { CreateResearchNoteDTO } from '../../presentation/dto';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class CreateResearchNoteUseCase {
  constructor(private readonly repository: ResearchNoteRepository) {}

  async execute(data: CreateResearchNoteDTO): Promise<void> {
    const { id, research_id, id_note, text, color, color_name } = data;

    if (!id?.trim()) throw new ValidationError('id no puede ser nulo o vacío');
    if (!research_id?.trim()) throw new ValidationError('research_id no puede ser nulo o vacío');
    if (!id_note?.trim()) throw new ValidationError('id_note no puede ser nulo o vacío');
    if (!text?.trim()) throw new ValidationError('text no puede ser nulo o vacío');
    if (!color?.trim()) throw new ValidationError('color no puede ser nulo o vacío');
    if (!color_name?.trim()) throw new ValidationError('color_name no puede ser nulo o vacío');

    Logger.info('Creando nota de investigación', { id, research_id });

    await this.repository.create({
      id,
      research_id,
      id_note,
      text,
      color,
      color_name,
    });
  }
}
