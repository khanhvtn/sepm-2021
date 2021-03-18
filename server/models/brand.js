import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name can not be blanked.'] 
        },
        title: {
            type: String,
            required: [true, 'Title can not be blanked.'],
        },
        description: {
            type: String,
            required: [true, 'Description can not be blanked.'],
        },
        category: {
            type: String,
            required: [true, 'Category can not be blanked.'],
        },
        image: {
            type: String,
            required: [true, 'Image can not be blanked.'],
        },
    },
    { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
