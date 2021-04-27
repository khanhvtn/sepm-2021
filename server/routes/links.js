import express from 'express';
import { 
    createLink, 
    accessLink, 
    trackUser 
} from '../controllers/links.js';

import auth from '../middlewares/auth.js';

const router = express.Router();
router.post('/', auth, createLink);
router.post('/:id', accessLink)
router.post('/track/user', trackUser)

export default router;
