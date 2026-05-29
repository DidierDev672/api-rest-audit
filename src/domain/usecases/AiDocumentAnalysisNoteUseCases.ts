import { AiDocumentAnalysisNote } from '../entities';
import { IAiDocumentAnalysisNoteRepository } from '../repositories/IAiDocumentAnalysisNoteRepository';
import { IAiDocumentAnalysisRepository } from '../repositories/IAiDocumentAnalysisRepository';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateAiDocumentAnalysisNoteUseCase {
  constructor(
    private readonly noteRepository: IAiDocumentAnalysisNoteRepository,
    private readonly analysisRepository: IAiDocumentAnalysisRepository,
  ) {}

  async execute(data: {
    aiDocumentAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: string;
  }): Promise<AiDocumentAnalysisNote> {
    IdValidator.validate(data.aiDocumentAnalysisId, 'AiDocumentAnalysis');

    const analysis = await this.analysisRepository.findById(data.aiDocumentAnalysisId);
    if (!analysis) {
      throw new Error('Análisis de documento no encontrado');
    }

    const createdAt = data.createdAt ? new Date(data.createdAt) : undefined;

    Logger.info('Creando nota para análisis de documento IA', {
      aiDocumentAnalysisId: data.aiDocumentAnalysisId,
    });

    return this.noteRepository.create({
      aiDocumentAnalysisId: data.aiDocumentAnalysisId,
      content: data.content.trim(),
      color: data.color,
      colorName: data.colorName,
      createdAt,
    });
  }
}

export class GetAiDocumentAnalysisNotesUseCase {
  constructor(private readonly noteRepository: IAiDocumentAnalysisNoteRepository) {}

  async execute(aiDocumentAnalysisId?: string): Promise<AiDocumentAnalysisNote[]> {
    if (aiDocumentAnalysisId) {
      IdValidator.validate(aiDocumentAnalysisId, 'AiDocumentAnalysis');
      return this.noteRepository.findByAnalysisId(aiDocumentAnalysisId);
    }
    return this.noteRepository.findAll();
  }
}

export class GetAiDocumentAnalysisNoteByIdUseCase {
  constructor(private readonly noteRepository: IAiDocumentAnalysisNoteRepository) {}

  async execute(id: string): Promise<AiDocumentAnalysisNote | null> {
    IdValidator.validate(id, 'AiDocumentAnalysisNote');
    return this.noteRepository.findById(id);
  }
}

export class DeleteAiDocumentAnalysisNoteUseCase {
  constructor(private readonly noteRepository: IAiDocumentAnalysisNoteRepository) {}

  async execute(id: string): Promise<void> {
    IdValidator.validate(id, 'AiDocumentAnalysisNote');

    const existing = await this.noteRepository.findById(id);
    if (!existing) {
      throw new Error('Nota no encontrada');
    }

    await this.noteRepository.delete(id);
  }
}
