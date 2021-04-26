import dotenv from 'dotenv';

dotenv.config();

export const smsKey = {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
}

// export const smsKey = {
//     ACCOUNT_SID: "AC763cfe4f372695320e25d26cf50f2054",
//     AUTH_TOKEN: "e199a5b0c5b3794d2608ad88010e33ab"
// }
