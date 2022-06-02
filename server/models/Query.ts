import mongoose, { Schema } from 'mongoose';

const querySchema = new Schema({
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    number: { type: Number, unique: true, required: true },
    depth: { type: Number, required: false },
    complexity: { type: Number, required: false },
    time: { type: Number, required: false },
    logged_on: { type: Date },
});

export default mongoose.model('Query', querySchema, 'queries');
