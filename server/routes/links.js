import express from 'express';
import { 
    createLink, 
    accessLink, 
    trackUser,
    getLinks,
    deleteLink
} from '../controllers/links.js';

import auth from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getLinks);
router.delete('/:id', deleteLink)
router.post('/', auth, createLink);
router.post('/:id', accessLink)
router.post('/track/user', trackUser)

export default router;
