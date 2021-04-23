import History from '../models/history.js';
import Code from '../models/code.js'
import Voucher from '../models/voucher.js'
import mongoose from 'mongoose';
import { sendEmail } from './misc/mailer.js'
import { sendSMS } from './misc/sms.js'
import { html } from '../template/mail.js'


export const getHistories = async (req, res) => {
    try {
        const histories = await History.find()
        // .populate('user').populate('voucher');
        res.status(200).json(histories)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



export const createHistory = async (req, res) => {
    // const history = req.body;
    const codes = await Code.find({ voucher: req.body.voucher, isSold: false })
    if (codes.length === 1) {
        const code = codes[0];
        const voucher = await Voucher.findById(req.body.voucher)
        const newHistory = new History({
            user: req.body.user,
            voucherCode: code.code,
            voucher: req.body.voucher,
            email: req.body.email,
            phone: req.body.phone,
            option: req.body.option
        });
        try {
            await newHistory.save();

            await Code.findByIdAndUpdate(
                code._id,
                { $set: { 'isSold': true } },

                { new: true }

            )

            await Voucher.findByIdAndUpdate(
                code.voucher,
                { $set: { 'isAvailable': false} },
                { new: true }

            )

            res.status(200).json({ newHistory });



            if (newHistory.option == "EMAIL") {
                sendEmail(
                    'noreply@vouchy.com',
                    newHistory.email,
                    "Voucher Code from Vouchy",
                    html(code, voucher, newHistory.date))
            } else {


                var phone = newHistory.phone;
                var e164Format = phone.slice(1);
                sendSMS.messages
                    .create({
                        body: `Hello from Vouchy. Your voucher code is ${newHistory.voucherCode}`,
                        from: '+14158010061',
                        to: `+84${e164Format}`
                    })
                    .then(message => console.log(message.sid))
                    .catch(err => console.log(err));

            }



        } catch (error) {
            res.status(404).json({ message: error.message })
        }

    } if (codes.length > 1) {
        const code = codes[0];
        const voucher = await Voucher.findById(req.body.voucher)
        const newHistory = new History({
            user: req.body.user,
            voucherCode: code.code,
            voucher: req.body.voucher,
            email: req.body.email,
            phone: req.body.phone,
            option: req.body.option
        });
        try {
            await newHistory.save();

            await Code.findByIdAndUpdate(
                code._id,
                { $set: { 'isSold': true } },

                { new: true }

            )


            res.status(200).json({ newHistory });



            if (newHistory.option == "EMAIL") {
                sendEmail(
                    'noreply@vouchy.com',
                    newHistory.email,
                    "Voucher Code from Vouchy",
                    html(code, voucher, newHistory.date))
            } else {


                var phone = newHistory.phone;
                var e164Format = phone.slice(1);
                sendSMS.messages
                    .create({
                        body: `Hello from Vouchy. Your voucher code is ${newHistory.voucherCode}`,
                        from: '+14158010061',
                        to: `+84${e164Format}`
                    })
                    .then(message => console.log(message.sid))
                    .catch(err => console.log(err));

            }



        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export const deleteHistory = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No history with that id');
    }
    await History.findByIdAndRemove(_id);
    res.json({ message: 'History deleted successfully' });

}

