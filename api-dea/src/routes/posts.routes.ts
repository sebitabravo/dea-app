import { Router } from "express";
import * as postsController from '../controllers/posts.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const route = 'posts';

router.get(`/${route}`, postsController.getPosts);
router.post(`/${route}`, authMiddleware, postsController.createPost);
router.put(`/${route}/:id`, authMiddleware, postsController.updatePost);
router.delete(`/${route}/:id`, authMiddleware, postsController.deletePost);

export default router;
