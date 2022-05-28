import mongoose, { Schema } from 'mongoose';

const querySchema = new Schema({
    projectID: { type: String, required: true },
    name: { type: String, required: true },
    depth: { type: Number, required: false },
    complexity: { type: Number, required: false },
    time: { type: Number, required: false },
});

export default mongoose.model('Query', querySchema, 'queries');
