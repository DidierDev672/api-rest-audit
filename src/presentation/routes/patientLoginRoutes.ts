import { Router } from 'express';
import { PatientLoginController } from '../controllers';

const router = Router();

router.post('/register', PatientLoginController.register);
router.post('/login', PatientLoginController.login);
router.post('/logout', PatientLoginController.logout);
router.get('/validate', PatientLoginController.validateToken);

export default router;
