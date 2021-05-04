import mongoose from 'mongoose'

const guestSchema = mongoose.Schema(
    {
        guestToken: {
            type: String,
            required: true
        },
        expireAt: {
            type: Date,
            default: Date.now,
            index: { unique: true, expires: '5m' }
        }
    },
    { timestamps: true }
);

guestSchema.index({ expireAt: 1 },{ expires: "5m" })

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;