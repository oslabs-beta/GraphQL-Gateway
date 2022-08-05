import 'dotenv/config';
import mongoose from 'mongoose';

const dbName = process.env.NODE_ENV === 'production' ? 'production' : 'test';

const connectDB = async (): Promise<void> => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI, { dbName });
            // eslint-disable-next-line no-console
            console.log('[Server] MongoDB connection successful');
        } else throw new Error(`[Server] MONGO_URI field missing in .env`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`[Server] MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
