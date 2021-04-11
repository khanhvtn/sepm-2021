import mongoose from 'mongoose'

const historySchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },

        voucher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
            required: true
        },

        voucherCode: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    }
)

const History = mongoose.model('History', historySchema);
export default History;