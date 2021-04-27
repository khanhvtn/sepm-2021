import dotenv from 'dotenv';

dotenv.config();

export const smsKey = {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
}

