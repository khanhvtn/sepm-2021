import express from 'express';
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    signInBrand,
    signUpBrand,
} from '../controllers/brands.js';


const router = express.Router();

router.get('/', getBrands);
router.post('/', createBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);
router.post('/signin', signInBrand);
router.post('/signup', signUpBrand)

export default router;
