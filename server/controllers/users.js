import User from '../models/user.js';
import Game from '../models/game.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dateFNS from 'date-fns';

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const checkCurrentUser = async (req, res) => {
    const { userId } = req;

    try {
        const existingUser = await User.findById(userId);
        if (existingUser) {
            res.status(200).json({ result: existingUser });
        } else {
            res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong.' });
    }
};
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    try {
        const newUpdateUser = await User.findByIdAndUpdate(
            id,
            {
                ...user,
            },
            {
                new: true,
            }
        );
        res.status(200).json(newUpdateUser);
    } catch (error) {
        res.status(500).json({ message: 'Some thing went wrong.' });
    }
};
export const winGame = async (req, res) => {
    const { userId } = req;
    const user = req.body;
    try {
        // example id 6051b7c313efff1a12ee8581
        //check user have played or not
        const checkGameUserInfo = await Game.findOne({ userId });

        if (checkGameUserInfo) {
            const gameAttempts = parseInt(checkGameUserInfo.attempts);
            if (gameAttempts >= 3) {
                //warning the user that they reachs limitation for the redeem system.
                return res.status(403).json({
                    redeem: true,
                    message:
                        'You can not receive the redeem because you have redeemed 3 times today',
                });
            } else {
                //update attempts game for user
                const updateUserGameInfo = await Game.findOneAndUpdate(
                    { userId },
                    {
                        userId: mongoose.Types.ObjectId(userId),
                        attempts: gameAttempts + 1,
                        expireDate: dateFNS.set(Date.now(), {
                            hours: 24,
                            minutes: 59,
                            seconds: 0,
                        }),
                    },
                    { new: true }
                );
            }
        } else {
            //create new user game information
            const createNewGame = await Game.create({
                userId: mongoose.Types.ObjectId(userId),
                attempts: 1,
                expireDate: dateFNS.set(Date.now(), {
                    hours: 24,
                    minutes: 59,
                    seconds: 0,
                }),
            });
        }
        //plus 500 points to the user.
        const newUpdateUser = await User.findByIdAndUpdate(
            userId,
            {
                ...user,
            },
            {
                new: true,
            }
        );
        return res.status(200).json(newUpdateUser);
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
