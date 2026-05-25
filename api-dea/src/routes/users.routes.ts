import { Router } from "express";
import * as usersController from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const route = 'users';

router.get(`/${route}`, usersController.getUsers);
router.get(`/${route}/:id`, usersController.getUserById);
router.put(`/${route}/:id`, authMiddleware, usersController.updateUser);

export default router;
