import express from 'express';
import { createLink, accessLink } from '../controllers/links.js';

import auth from '../middlewares/auth.js';

const router = express.Router();
router.post('/', auth, createLink);
router.post('/:id', accessLink)

export default router;
