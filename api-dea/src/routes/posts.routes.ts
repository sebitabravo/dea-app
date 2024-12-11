import { Router } from "express";
import * as postsController from '../controllers/posts.controller';

const router = Router();
const route = 'posts';

// Obtenemos todos los posts
router.get(`/${route}`, postsController.getPosts);

// Creamos un nuevo post
router.post(`/${route}`, postsController.createPost);


export default router;