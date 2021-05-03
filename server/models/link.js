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

linkSchema.index({ createdAt: 1 }, { expires: "5m"})

const Link = mongoose.model('Link', linkSchema);
export default Link;