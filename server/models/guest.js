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

guestSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

const Guest = mongoose.model('Guest', guestSchema);
export default Guest;