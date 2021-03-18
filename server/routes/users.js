import express from 'express';
import { signin, signup, getUser } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', getUser);

export default router;
