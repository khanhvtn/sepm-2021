import mongoose from 'mongoose';
import Link from '../models/link.js';
import User from '../models/user.js';
import Voucher from '../models/voucher.js';


export const createLink = async (req, res) => {
    const { voucherId } = req.body;
    const { userId } = req;

    console.log("VoucherId: ", voucherId)
    console.log("UserId: ", userId)

    const newLink = new Link({
        userId: mongoose.Types.ObjectId(userId),
        voucherId: mongoose.Types.ObjectId(voucherId)
    })

    try {
        await newLink.save();
        res.status(200).json(newLink._id)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const accessLink = async (req, res) => {
    const { id: _id } = req.params;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Failed Id');
    }

    try {
        // Check if like is available
        const checkAvailableLink = await Link.findOne({ _id })

        if (checkAvailableLink) {
            const authorId = checkAvailableLink.userId;
            const fetchVoucher = await Voucher.findById({ _id: checkAvailableLink.voucherId })


            if (userId === authorId) {
                res.status(200).json({ voucher: fetchVoucher, authorAccess: true, expiredLink: false, message: 'Author of the voucher cannot update point' })
            }

            if (fetchVoucher.expiredDate > Date.now() || fetchVoucher.startedDate < Date.now()) {
                res.status(200).json({ expiredLink: true, message: 'This voucher is expired!' })
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

        } else {
            res.status(200).json({ expiredLink: true })
        }

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}