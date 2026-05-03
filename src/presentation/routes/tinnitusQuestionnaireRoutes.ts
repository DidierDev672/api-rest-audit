import { Router } from 'express';
import { TinnitusQuestionnaireController } from '../controllers';

const router = Router();

router.post('/', TinnitusQuestionnaireController.create);
router.get('/', TinnitusQuestionnaireController.findAll);
router.get('/:id', TinnitusQuestionnaireController.findById);
router.put('/:id', TinnitusQuestionnaireController.update);
router.delete('/:id', TinnitusQuestionnaireController.delete);

export default router;
