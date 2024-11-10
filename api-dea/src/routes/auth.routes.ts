import { Router } from "express";
import * as authController from '../controllers/auth.controller';

const router = Router();
const route = 'auth';

router.post(`/${route}/register`, authController.register);

// router.post(`/${route}/login`, authController.login);

export default router;