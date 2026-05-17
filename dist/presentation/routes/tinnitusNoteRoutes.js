"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// GET /api/v1/tinnitus-notes - Obtener todas las notas
router.get('/', controllers_1.TinnitusNoteController.findAll);
// Rutas específicas (deben ir ANTES de las rutas con parámetros)
router.get('/note/:id', controllers_1.TinnitusNoteController.findById);
router.put('/note/:id', controllers_1.TinnitusNoteController.update);
router.delete('/note/:id', controllers_1.TinnitusNoteController.delete);
router.get('/questionnaire/:questionnaireId', controllers_1.TinnitusNoteController.findByQuestionnaire);
router.get('/response/:responseId', controllers_1.TinnitusNoteController.findByResponse);
// GET /api/v1/tinnitus-notes/:id_patient - Obtener notas por paciente
router.get('/:id_patient', controllers_1.TinnitusNoteController.findByPatient);
// POST /api/v1/tinnitus-notes/:id_patient - Crear nota para un paciente
router.post('/:id_patient', controllers_1.TinnitusNoteController.createForPatient);
exports.default = router;
//# sourceMappingURL=tinnitusNoteRoutes.js.map