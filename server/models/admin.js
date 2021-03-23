import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email can not be blanked.']
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;