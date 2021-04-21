import mongoose from 'mongoose';

const voucherSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, 'Title can not be blanked.'] },
        creator: {
            type: String,
        },
        creatorName: {
            type: String,
        },
        description: {
            type: String,
            required: [true, 'Description can not be blanked.'],
        },
        category: {
            type: String,
            required: [true, 'Category can not be blanked.'],
        },
        brand: {
            type: String,
            required: [true, 'Brand name can not be blanked.'],
        },
        image: {
            type: String,
            required: [true, 'Image can not be blanked.'],
        },
        price: {
            type: String,
            required: [true, 'Price can not be blanked.'],
        },
        percentage: {
            type: String,
            required: [true, 'Percentage can not be blanked.'],
        },
        startedDate: {
            type: Date,
            required: [true, 'Start Date can not be blanked.'],
        },
        expiredDate: {
            type: Date,
            required: [true, 'Expired Date can not be blanked.'],
        },

        isActive: {
            type: Boolean,
            default: false,
            required: true

        },

        isAvailable: {
            type: Boolean,
            default: false,
            required: true

        }
    },
    { timestamps: true }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
