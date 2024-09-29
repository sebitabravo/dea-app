import { Router } from "express";

const router = Router();

router.get('/users', (_req, res) => {
    res.send('Users');
});

export default router;

