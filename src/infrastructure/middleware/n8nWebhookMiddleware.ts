import { Request, Response, NextFunction } from 'express';

function extractSecret(req: Request): string | undefined {
  const webhookSecret = req.headers['x-n8n-webhook-secret'];
  if (typeof webhookSecret === 'string' && webhookSecret.trim()) {
    return webhookSecret.trim();
  }

  const apiKey = req.headers['x-api-key'];
  if (typeof apiKey === 'string' && apiKey.trim()) {
    return apiKey.trim();
  }

  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return undefined;
}

export const n8nWebhookMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const expectedWebhookSecret = process.env.N8N_WEBHOOK_SECRET?.trim();
  const expectedApiKey = process.env.N8N_API_KEY?.trim();
  const expectedSecrets = [expectedWebhookSecret, expectedApiKey].filter(
    Boolean
  ) as string[];

  if (expectedSecrets.length === 0) {
    next();
    return;
  }

  const receivedSecret = extractSecret(req);

  if (!receivedSecret || !expectedSecrets.includes(receivedSecret)) {
    res.status(401).json({
      error: 'No autorizado: credencial de webhook inválida o ausente',
    });
    return;
  }

  next();
};
