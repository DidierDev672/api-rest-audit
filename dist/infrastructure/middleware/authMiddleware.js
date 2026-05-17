"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const database_1 = require("../database");
const Logger_1 = require("../logger/Logger");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        Logger_1.Logger.warning('Auth middleware - Token requerido');
        res.status(401).json({
            status: 'error',
            code: 'UNAUTHORIZED',
            message: 'Token de autenticación requerido',
        });
        return;
    }
    const token = authHeader.substring(7);
    const repository = new database_1.PatientLoginRepository();
    try {
        const user = await repository.findByToken(token);
        if (!user) {
            Logger_1.Logger.warning('Auth middleware - Token inválido');
            res.status(401).json({
                status: 'error',
                code: 'UNAUTHORIZED',
                message: 'Token inválido o expirado',
            });
            return;
        }
        req.user = {
            id: user.id,
            idPatient: user.idPatient,
            email: user.email,
            permits: user.permits,
        };
        next();
    }
    catch (error) {
        Logger_1.Logger.danger('Auth middleware - Error interno', { error: error.message });
        res.status(500).json({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: 'Error al validar autenticación',
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map