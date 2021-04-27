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
    },
    { timestamps: true }
);

linkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 })

const Link = mongoose.model('Link', linkSchema);
export default Link;