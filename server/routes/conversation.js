import express from 'express'
import { createConversation, findConversation, userConversations } from '../controllers/conversation.js';
const router = express.Router()

router.post('/', createConversation);
router.get('/:userId', userConversations);
router.get('/find/:firstId/:secondId', findConversation);

export default router;
