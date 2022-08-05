import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    requestIP: { type: String, required: true },
    number: { type: Number, unique: true, required: true },
    depth: { type: Number, required: false },
    complexity: { type: Number, required: false },
    success: { type: Boolean, required: true },
    tokens: { type: Number },
    timestamp: { type: Number, required: true },
    loggedOn: { type: Number, required: true },
    latency: { type: Number },
});

export default mongoose.model('Query', querySchema, 'queries');
