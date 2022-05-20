import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    // apps: {
    //     appOne: {
    //         apiKey: { type: String },
    //         logs: []
    //     },
    //     appTwo: {
    //         name: { type: String }
    //     },
    //     appThree: {
    //         name: { type: String }
    //     },
    // }
});

export default mongoose.model('User', userSchema);
