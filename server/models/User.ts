import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    email: string;
    password: string;
}

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

// const User = mongoose.model<UserInterface>("User", userSchema);
// export default User;

module.exports = mongoose.model<UserInterface>('User', userSchema);
