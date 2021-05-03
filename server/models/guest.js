import mongoose from 'mongoose'

const guestSchema = mongoose.Schema(
    {
        guestToken: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

guestSchema.index({ createdAt: 1 }, { expires: "5m" })

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;