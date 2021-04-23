import Code from '../models/code.js'
import Voucher from '../models/voucher.js'
import mongoose from 'mongoose';


export const getCodes = async (req, res) => {
    try {
        const codes = await Code.find();
        // .populate('voucher');
        res.status(200).json(codes);
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const createCode = async(req, res) => {
    const code = req.body;
    const newCode = new Code(code);
    try {
        await newCode.save();
        await Voucher.findByIdAndUpdate(
            code.voucher,
            { $set: { 'isAvailable': true } },
            { new: true }

        )
        res.status(200).json(newCode);


    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateCode = async (req, res) => {
    const { id: _id } = req.params;
    const updateCode = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No code with that id');
    }
    const updateMessage = await Code.findByIdAndUpdate(
        _id,
        { ...updateCode, _id },
        {
            new: true,
        }
    );

    res.json(updateMessage);
};

export const deleteCode = async(req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No code with that id');
    }
    await Code.findByIdAndRemove(_id);
    res.json({ message: 'Code deleted successfully' });
}