import mongoose from 'mongoose';
import Guest from '../models/guest.js';
import Link from '../models/link.js';
import User from '../models/user.js';
import Voucher from '../models/voucher.js';

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.status(200).json(links);
    } catch (error) {
        res.status(404).json(error);

    }

}

export const deleteLink = async(req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No Link with that id');
    }
    await Link.findByIdAndRemove(_id);
    res.json({ message: 'Link deleted successfully' });
}


export const createLink = async (req, res) => {
    const { voucherId } = req.body;
    const { userId } = req;

    const newLink = new Link({
        userId: mongoose.Types.ObjectId(userId),
        voucherId: mongoose.Types.ObjectId(voucherId)
    })

    try {
        await newLink.save();
        
        console.log("Create browser token: ", newLink._id)

        res.status(200).json(newLink._id)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const accessLink = async (req, res) => {
    const { id: _id } = req.params;
    const { validGuest } = req.body;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Failed Id');
    }

    try {
        // Check if like is available
        const checkAvailableLink = await Link.findOne({ _id })

        if (checkAvailableLink) {
            console.log("Check available link: ", true)
            const authorId = checkAvailableLink.userId.toString();
            const fetchVoucher = await Voucher.findById({ _id: checkAvailableLink.voucherId })

            if (fetchVoucher.expiredDate < Date.now() || fetchVoucher.startedDate > Date.now()) {
                console.log("Check voucher's valid date: ", true)
                res.status(200).json({ expiredLink: true, message: 'This voucher is expired!' })
            } else {
                console.log("userId:", userId)
                console.log("AuthorId:", authorId)
                console.log("Check user id: ", userId === authorId)
                if (userId === authorId) {
                    res.status(200).json({ voucher: fetchVoucher, authorAccess: true, expiredLink: false, message: 'Author of the voucher is current user' })
                } else {
                    console.log("Check valid guest: ", validGuest)
                    if (!validGuest) {
                        res.status(200).json({ voucher: fetchVoucher, message: 'Author of the voucher cannot update point because this browser is expired' })
                    } else {
                        // Query Author of the share link to get the current point to update
                        const currentAuthor = await User.findById({ _id: authorId })
                        const updatePoint = `${parseInt(currentAuthor.points) + 100}`

                        // Update point
                        await User.findByIdAndUpdate(
                            authorId,
                            {
                                points: updatePoint
                            }
                        );
                        res.status(200).json({ voucher: fetchVoucher, expiredLink: false, message: 'Update point success!' })
                    }

                }

            }

        } else {
            res.status(200).json({ expiredLink: true, message: 'This link is expired!' })
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const trackUser = async (req, res) => {
    const { clientToken } = req.body;

    console.log("Get browser token: ", clientToken)
    try {
        const checkAvailableGuest = await Guest.findOne({ guestToken: clientToken })

        if (checkAvailableGuest) {
            console.log("Check valid guest: ", checkAvailableGuest.validGuest)
            res.status(200).json({ validGuest: false })
        } else {
            const newGuest = new Guest({
                guestToken: clientToken
            })

            await newGuest.save()
            res.status(200).json({ validGuest: true })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}