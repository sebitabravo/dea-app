import { Router } from "express";
import * as usersController from '../controllers/users.controller';

const router = Router();

router.get('/users', usersController.getUsers);

export default router;

