"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// POST /api/v1/tinnitus-notes-analysis - Crear análisis de notas
router.post('/', controllers_1.TinnitusNotesAnalysisController.create);
// GET /api/v1/tinnitus-notes-analysis - Obtener todos los análisis
router.get('/', controllers_1.TinnitusNotesAnalysisController.findAll);
// Rutas específicas (deben ir ANTES de las rutas con parámetros genéricos)
router.get('/response/:responseId', controllers_1.TinnitusNotesAnalysisController.findByResponse);
router.get('/patient/:patientId', controllers_1.TinnitusNotesAnalysisController.findByPatient);
router.get('/questionnaire/:questionnaireId', controllers_1.TinnitusNotesAnalysisController.findByQuestionnaire);
// GET /api/v1/tinnitus-notes-analysis/:id - Obtener análisis por ID
router.get('/:id', controllers_1.TinnitusNotesAnalysisController.findById);
// PUT /api/v1/tinnitus-notes-analysis/:id - Actualizar análisis
router.put('/:id', controllers_1.TinnitusNotesAnalysisController.update);
// DELETE /api/v1/tinnitus-notes-analysis/:id - Eliminar análisis
router.delete('/:id', controllers_1.TinnitusNotesAnalysisController.delete);
exports.default = router;
//# sourceMappingURL=tinnitusNotesAnalysisRoutes.js.map