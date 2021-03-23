import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        points: { type: String, default: '0' },
        accountBalance: { type: String, default: '0' },
        loggedIn: { type: Date }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
