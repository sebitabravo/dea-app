import { Router } from "express";
import { indexWelcome, ping } from "../controllers/index.controller";

const router = Router();

router.route('/') 
    .get(indexWelcome);

 router.get('/ping', ping);

export default router;