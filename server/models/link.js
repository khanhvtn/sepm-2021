import mongoose from 'mongoose'

const linkSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        voucherId: {
            type: mongoose.Schema.Types.ObjectId,
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

linkSchema.index({ expireAt: 1 }, { expires: "5m" })

const Link = mongoose.model('Link', linkSchema);
export default Link;