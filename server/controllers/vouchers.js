import Voucher from '../models/voucher.js';
import Code from '../models/code.js';
import mongoose from 'mongoose';

export const getVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createVoucher = async (req, res) => {
    const voucher = req.body;
    const newVoucher = new Voucher(voucher);

    try {
        await newVoucher.save();
        res.status(201).json(newVoucher);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const updateVoucher = async (req, res) => {
    const { id: _id } = req.params;
    const updateVoucher = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    const updateMessage = await Voucher.findByIdAndUpdate(
        _id,
        { ...updateVoucher, _id },
        {
            new: true,
        }
    );

    res.json(updateMessage);
};

export const getVouchersByCategory = async (req, res) => {
    const catRequest = req.params.cat;
    
    if (catRequest === "food&beverage"){
        try {
            const vouchers = await Voucher.find({ category: "Food and Beverage", isActive: true, isAvailable: true, isPublished: true })
            res.status(200).json(vouchers)
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    if (catRequest === "travel"){
        try {
            const vouchers = await Voucher.find({ category: "Travel", isActive: true, isAvailable: true, isPublished: true })
            res.status(200).json(vouchers)
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    if (catRequest === "beauty"){
        try {
            const vouchers = await Voucher.find({ category: "Beauty", isActive: true, isAvailable: true, isPublished: true })
            res.status(200).json(vouchers)
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    if (catRequest === "all"){
        try {
            const vouchers = await Voucher.find({isActive: true, isAvailable: true, isPublished: true})
            res.status(200).json(vouchers)
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    


}

export const deleteVoucher = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    await Voucher.findByIdAndRemove(_id);
    res.json({ message: 'Voucher deleted successfully' });
};
