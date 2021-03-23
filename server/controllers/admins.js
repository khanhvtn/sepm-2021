import User from '../models/user.js';
import Brand from '../models/brand.js';
import Voucher from '../models/voucher.js';


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setVoucher = async (req, res) => {
    const { id: _id } = req.params;
    const updateVoucher = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    try {
        const updateMessage = await Voucher.findByIdAndUpdate(
            _id,
            { isAccepted: true }
        );

        res.json(updateMessage);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};