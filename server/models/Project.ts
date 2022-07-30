import mongoose, { Schema } from 'mongoose';

const RateLimitOptions = new Schema({
    rate: { type: Number, required: true },
    windowSize: { type: Number, required: true },
    capacity: { type: Number, required: true },
});

const RateLimiterConfig = new Schema({
    type: { type: String, required: true },
    options: { type: RateLimitOptions, required: true },
});

const projectSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true },
    rateLimiterConfig: { type: RateLimiterConfig, required: false },
});

export default mongoose.model('Project', projectSchema, 'projects');
