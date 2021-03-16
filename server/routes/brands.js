import express from 'express';
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
} from '../controllers/brands.js';


const router = express.Router();

router.get('/', getBrands);
router.post('/', createBrand);
router.patch('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router;
