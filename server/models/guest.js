import mongoose from 'mongoose'

const guestSchema = mongoose.Schema(
    {
        guestToken: {
            type: String,
            required: true
        },
        expireAt: {
            type: Date,
            default: null,
            index: { unique: true, expires: '2m' }
        }


    },
    { timestamps: true }
);

guestSchema.index({ expireAt: 1 },{ expires: "2m" })

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;