import { Router } from "express";
import * as usersController from '../controllers/users.controller';

const router = Router();

const route = 'users';

// Obtenemos todos los usuarios
router.get(`/${route}`, usersController.getUsers);

// Creamos un usuario por id
router.get(`/${route}/:id`, usersController.getUserById);

export default router;

