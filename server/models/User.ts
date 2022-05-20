const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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

export default mongoose.model('User', userSchema);
