import { Router } from "express";
import * as deaPointsController from '../controllers/deaPoints.controller';

const router = Router();
const table = 'dea_points'

router.get(`/${table}`, deaPointsController.getDeaPoints)

export default router;