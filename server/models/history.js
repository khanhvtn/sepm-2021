import mongoose from 'mongoose'
const {ObjectID} = mongoose.Schema

const historySchema = mongoose.Schema(
    {
        user:{
            type: ObjectID,
            ref: 'User',
            required: true

        },

        voucher: {
            type: ObjectID,
            ref: "Voucher",
            required: true
        },

        voucherCode: {
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