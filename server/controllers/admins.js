import User from '../models/user.js';
import Voucher from '../models/voucher.js';
import mongoose from 'mongoose';
import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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

export const getActiveVoucher = async (req, res) => {
    try {
        const vouchers = await Voucher.find( { isActive: true });
        res.status(200).json(vouchers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPublishedVoucher = async (req, res) => {
    try {
        const vouchers = await Voucher.find( { isPublished: true });
        res.status(200).json(vouchers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setVoucher = async (req, res) => {
    const { id: _id } = req.params;
    const { type } = req.body

    const action = type === 'ACCEPT' ? true : false

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No voucher with that id');
    }
    try {
        const updateMessage = await Voucher.findByIdAndUpdate(
            _id,
            { isActive: action },
            { new : true }
        );

        res.status(200).json(updateMessage);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

export const publishVoucher = async (req, res) => {
    const {id: _id} = req.params;
    const { type } = req.body

    const action = type === 'PUBLISH' ? true : false

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No voucher with that id');
    }
    try {
        const updateMessage = await Voucher.findByIdAndUpdate(
            _id,
            { isPublished: action },
            { new: true }
        );
        console.log(updateMessage)
        res.status(200).json(updateMessage);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAdmin = await Admin.findOne({ email });
        //response error if user doesn't exist.
        if (!existingAdmin) {
            return res.status(404).json({ message: "Admin doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        );

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
        res.status(500).json({ message: error.message });
    }
}

export const checkCurrentAdmin = async (req, res) => {
    const { userId } = req;

    try {
        const existingAdmin = await Admin.findById(userId);
        if (existingAdmin) {
            res.status(200).json({ result: existingAdmin });
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(res.body)

    try {
        const existingAdmin = await Admin.findOne({ email });
        // Response error if email already exists.
        if (existingAdmin) {
            return res.status(404).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
        });

        //response success
        res.status(200).json({ result: newAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};