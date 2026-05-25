import { Router } from "express";
import * as deaPointsController from '../controllers/deaPoints.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const route = 'dea-points';

router.get(`/${route}`, deaPointsController.getDeaPoints);
router.post(`/${route}`, authMiddleware, deaPointsController.createDeaPoint);
router.put(`/${route}/:id`, authMiddleware, deaPointsController.updateDeaPoint);
router.delete(`/${route}/:id`, authMiddleware, deaPointsController.deleteDeaPoint);

export default router;
