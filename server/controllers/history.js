import History from '../models/history.js';
import mongoose from 'mongoose';
import { sendEmail } from './misc/mailer.js'
import { sendSMS } from './misc/sms.js'
import { html } from '../template/mail.js'


export const getHistories = async (req, res) => {
    try {
        const histories = await History.find().populate('user').populate('voucher');
        res.status(200).json(histories)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



export const createHistory = async (req, res) => {
    const history = req.body;
    const newHistory = new History(history);
    try {
        await newHistory.save();
        res.status(200).json(newHistory);


        if (history.option == "EMAIL") {
            sendEmail(
                'noreply@vouchy.com',
                history.email,
                "Voucher Code from Vouchy",
                html(history.voucherCode, history.date))
        } else {


            var phone = history.phone;
            var e164Format = phone.slice(1);
            sendSMS.messages
                .create({
                    body: `Hello from Vouchy. Your voucher code is ${history.voucherCode}`,
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

export const deleteHistory = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No history with that id');
    }
    await History.findByIdAndRemove(_id);
    res.json({ message: 'History deleted successfully' });

}

