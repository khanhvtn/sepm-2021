import nodemailer from 'nodemailer'
import {keyMailer} from '../../keys/mailer.js'


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keyMailer.GOOGLE_USER,
        pass: keyMailer.GOOGLE_PASSWORD
    }
})

export const sendEmail = (from, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({from, to, subject, html}, (err, info) => {
            if(err) reject(err);
                resolve(info);
        })
    })
}