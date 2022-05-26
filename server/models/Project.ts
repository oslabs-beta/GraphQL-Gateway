import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    queries: { type: Array, required: false },
    endpoint: { type: String },
});

export default mongoose.model('Project', projectSchema, 'projects');
