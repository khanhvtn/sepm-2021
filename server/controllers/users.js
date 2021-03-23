import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const existingUser = await User.findById(id);
        if (existingUser) {
            res.status(200).json({ result: existingUser });
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong.' });
    }
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        //response error if user doesn't exist.
        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        //response error if password is incorrect
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            'vouchy123',
            { expiresIn: '1h' }
        );

        //response success
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        // Response error if email already exists.
        if (existingUser) {
            return res.status(404).json({ message: 'User already exists' });
        }
        //Reponse error if password and confirm password does no match
        if (password !== confirmPassword) {
            return res.status(404).json({ message: "Passwords don't match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            loggedIn: new Date()
        });

        const token = jwt.sign(
            {
                email: newUser.email,
                id: newUser._id,
            },
            'vouchy123',
            { expiresIn: '1h' }
        );
        //response success
        res.status(200).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
