export class N8nIntegrationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 502
  ) {
    super(message);
    this.name = 'N8nIntegrationError';
  }
}
