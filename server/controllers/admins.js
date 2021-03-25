import User from '../models/user.js';
import Brand from '../models/brand.js';
import Voucher from '../models/voucher.js';
import mongoose from 'mongoose';
import Admin from '../models/admin.js';


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id: _id } = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No user with that id');
        }
        console.log(_id)
        await User.findByIdAndRemove(_id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setVoucher = async (req, res) => {
    const { id: _id } = req.params;
    const { type } = req.body

    const action = type === 'ACCEPT' ? true : false

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    try {
        const updateMessage = await Voucher.findByIdAndUpdate(
            _id,
            { isAccepted: action }
        );

        res.status(200).json(updateMessage);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        //response error if user doesn't exist.
        if (!existingUser) {
            return res.status(404).json({ message: "Admmin doesn't exist" });
        }

        const isPasswordCorrect = existingAdmin.password === password ? true : false
        //response error if password is incorrect
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }
        
        const token = jwt.sign(
            { email: existingAdmin.email, id: existingAdmin._id },
            'vouchy123',
            { expiresIn: '1h' }
        );

        //response success
        res.status(200).json({ result: existingAdmin, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}