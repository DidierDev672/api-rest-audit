/**
 * DTO - Screening Response
 * Data Transfer Object for tamizaje responses
 */

export interface ScreeningResponseOption {
  id: string;
  text: string;
  value: number;
}

export interface CreateScreeningResponseDTO {
  id_patient: string;
  id_screening: string;
  options_answer: ScreeningResponseOption[];
}

export interface UpdateScreeningResponseDTO {
  options_answer?: ScreeningResponseOption[];
}

export interface ScreeningResponseDTO {
  id: string;
  id_patient: string;
  id_screening: string;
  options_answer: ScreeningResponseOption[];
  created_at: string;
  updated_at: string;
}
