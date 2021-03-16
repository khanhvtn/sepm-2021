import mongoose from 'mongoose';
import Brand from '../models/brand.js';

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createBrand = async (req, res) => {
    const brand = req.body;

    const newBrand = new Brand(brand);

    try {
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const updateBrand = async (req, res) => {
    const { id: _id } = req.params;
    const updateBrand = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    const updateMessage = await Brand.findByIdAndUpdate(
        _id,
        { ...updateBrand, _id },
        {
            new: true,
        }
    );

    res.json(updateMessage);
};
export const deleteBrand = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    await Brand.findByIdAndRemove(_id);
    res.json({ message: 'Brand deleted successfully' });
};
