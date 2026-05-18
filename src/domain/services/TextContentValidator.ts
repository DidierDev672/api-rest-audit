import { ValidationError } from '../errors/ValidationError';

export class TextContentValidator {
  static validateNonEmpty(
    value: string | null | undefined,
    fieldName: string
  ): string {
    if (value === null || value === undefined) {
      throw new ValidationError(`${fieldName} no puede ser nulo`);
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new ValidationError(`${fieldName} no puede estar vacío`);
    }

    return trimmed;
  }
}
