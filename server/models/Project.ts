import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true },
});

export default mongoose.model('Project', projectSchema, 'projects');
