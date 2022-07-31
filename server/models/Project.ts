import mongoose, { Schema } from 'mongoose';

const RateLimitOption = new Schema({
    refillRate: { type: Number, required: true, default: 0 },
    windowSize: { type: Number, required: true, default: 0 },
    capacity: { type: Number, required: true },
});

const RateLimiterConfig = new Schema({
    type: { type: String, required: true },
    options: { type: RateLimitOption, required: true },
});

const projectSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    apiKey: { type: String, required: true },
    rateLimiterConfig: { type: RateLimiterConfig, required: false },
});

export default mongoose.model('Project', projectSchema, 'projects');
