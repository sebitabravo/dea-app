import { Router } from "express";
import * as postsController from '../controllers/posts.controller';

const router = Router();
const route = 'posts';

router.get(`/${route}`, postsController.getPosts);

router.post(`/${route}`, postsController.createPost);



export default router;