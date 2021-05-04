import express from 'express';
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    signup,
    signin,
} from '../controllers/brands.js';


const router = express.Router();

router.get('/', getBrands);
router.post('/', createBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);
router.post('/signin', signin);
router.post('/signup', signup)

export default router;
