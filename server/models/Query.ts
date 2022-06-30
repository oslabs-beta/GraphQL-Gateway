import mongoose, { Schema } from 'mongoose';

const querySchema = new Schema({
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    number: { type: Number, unique: true, required: true },
    depth: { type: Number, required: false },
    complexity: { type: Number, required: false },
    success: { type: Boolean, required: true },
    timestamp: { type: Number, required: false },
    logged_on: { type: Date },
    tokens: { type: Number },
});

export default mongoose.model('Query', querySchema, 'queries');
