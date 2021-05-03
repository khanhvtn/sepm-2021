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
        createdAt: { type: Date, default: Date.now, index: { unique: true} }
       

    },
    // { timestamps: true }
);

linkSchema.index({ createdAt: 1 }, {expires: "3m"} )

const Link = mongoose.model('Link', linkSchema);
export default Link;