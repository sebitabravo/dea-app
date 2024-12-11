import { Router } from "express";
import * as deaPointsController from '../controllers/deaPoints.controller';

const router = Router();
const route = 'dea-points';

// Obtenemos todos los puntos DEA
router.get(`/${route}`, deaPointsController.getDeaPoints);

// Creamos un nuevo punto DEA
router.post(`/${route}`, deaPointsController.createDeaPoint);

export default router;