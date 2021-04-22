import mongoose from 'mongoose';

const codeSchema = mongoose.Schema({
    voucher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        required: true
    },

    code: {
        type: String,
        required: true
    },

    isSold: {
        type: Boolean,
        default: false,
        required: true
    }

})

const Code = mongoose.model('Code', codeSchema);
export default Code