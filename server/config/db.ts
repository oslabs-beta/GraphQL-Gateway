import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('[Server] MongoDB connection successful');
        } else throw new Error(`[Server] MONGO_URI field missing in .env`);
    } catch (error) {
        console.error(`[Server] MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
