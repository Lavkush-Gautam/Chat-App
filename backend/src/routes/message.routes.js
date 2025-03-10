import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUserforSidebar, sendMessages } from '../controller/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUserforSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessages)



export default router;