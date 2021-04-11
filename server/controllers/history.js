import History from '../models/history.js';
import mongoose from 'mongoose';

export const getHistories = async(req, res) => {
    try {
        const histories = await History.find();
        res.status(200).json(histories)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createHistory = async(req, res) => {
    const history = req.body;
    const newHistory = new History (history);
    try {
        await newHistory.save();
        res.status(200).json(newHistory);
    } catch (error) {
        res.status(404).json({message: error.message})
    } 
}

export const deleteHistory = async(req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No history with that id');
    }
    await History.findByIdAndRemove(_id);
    res.json({ message: 'History deleted successfully' });

}