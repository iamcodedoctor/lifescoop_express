import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/verifyToken.js';
import PostController from '../controllers/postController.js';
const postController = new PostController();

// Read
router.get('/', verifyToken, postController.getFeedPosts);
router.get('/selfPosts', verifyToken, postController.getSelfPosts);
router.get('/:userId/posts', verifyToken, postController.getUserPosts);

// Update
router.patch('/:id/like', verifyToken, postController.likePost);

export default router;