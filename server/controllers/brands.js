import mongoose from 'mongoose';
import Brand from '../models/brand.js';

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const signInBrand = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingBrand = await Brand.findOne({ email });
        //response error if Brand doesn't exist.
        if (!existingBrand) {
            return res.status(404).json({ message: "Brand doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingBrand.password
        );

        //response error if password is incorrect
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { email: existingBrand.email, id: existingBrand._id },
            'vouchy123',
            { expiresIn: '1h' }
        );

        //response success
        res.status(200).json({ result: existingBrand, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const signUpBrand = async (req, res) => {
    const { name, category, email, password } = req.body;
    try {
        const existingBrand = await Brand.findOne({ username });
        // Response error if email already exists.
        if (existingBrand) {
            return res.status(404).json({ message: 'Brand already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newBrand = await Brand.create({
            email,
            password: hashedPassword,
            name: name,
            category: category
        });

        //response success
        res.status(200).json({ result: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

export const createBrand = async (req, res) => {
    const brand = req.body;

    const newBrand = new Brand(brand);

    try {
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateBrand = async (req, res) => {
    const { id: _id } = req.params;
    const updateBrand = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    const updateMessage = await Brand.findByIdAndUpdate(
        _id,
        { ...updateBrand, _id },
        {
            new: true,
        }
    );

    res.json(updateMessage);
};

export const deleteBrand = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }
    await Brand.findByIdAndRemove(_id);
    res.json({ message: 'Brand deleted successfully' });
};
