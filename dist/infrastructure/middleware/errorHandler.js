"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = exports.notFoundHandler = exports.errorHandler = exports.ConflictAppError = exports.NotFoundAppError = exports.ValidationAppError = exports.AppError = void 0;
const Logger_1 = require("../logger/Logger");
const zod_1 = require("zod");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
class ValidationAppError extends AppError {
    constructor(message, errors) {
        super(message, 400);
        this.name = 'ValidationAppError';
        this.errors = errors;
    }
}
exports.ValidationAppError = ValidationAppError;
class NotFoundAppError extends AppError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundAppError';
    }
}
exports.NotFoundAppError = NotFoundAppError;
class ConflictAppError extends AppError {
    constructor(message) {
        super(message, 409);
        this.name = 'ConflictAppError';
    }
}
exports.ConflictAppError = ConflictAppError;
const errorHandler = (err, req, res, _next) => {
    Logger_1.Logger.danger('Error capturado por middleware', {
        name: err.name,
        message: err.message,
        path: req.path,
        method: req.method,
        stack: err.stack,
    });
    if (err instanceof ValidationAppError) {
        res.status(err.statusCode).json({
            error: err.message,
            details: err.errors,
        });
        return;
    }
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
        });
        return;
    }
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: 'Error de validación',
            details: err.errors,
        });
        return;
    }
    res.status(500).json({
        error: 'Error interno del servidor',
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    Logger_1.Logger.warning('Ruta no encontrada', { path: req.path, method: req.method });
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path,
    });
};
exports.notFoundHandler = notFoundHandler;
const requestLogger = (req, res, next) => {
    Logger_1.Logger.info(`Solicitud recibida`, {
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip,
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=errorHandler.js.map