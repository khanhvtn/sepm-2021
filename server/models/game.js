import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    attempts: { type: String, default: '0' },
    expireDate: { type: Date, required: true, expires: 0 },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
