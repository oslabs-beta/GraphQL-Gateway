require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[Server] MongoDB connection successful');
    } catch (error) {
        console.error(`[Server] MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
