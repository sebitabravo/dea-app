import { Router } from "express";
import * as authController from '../controllers/auth.controller';

const router = Router();
const route = 'auth';

// Registrar usuario
router.post(`/${route}/register`, authController.register);

// Iniciar sesión
router.post(`/${route}/login`, authController.login);

export default router;