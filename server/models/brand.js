import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email can not be blanked.']
        },
        password: {
            type: String,
            required: true
        },
        name: { type: String },
        description: { type: String },
        category: { type: String },
        brandImage: { type: String },
        coverImage: { type: String },
    },
    { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
