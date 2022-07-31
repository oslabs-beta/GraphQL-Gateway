import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const uri =
        process.env.NODE_ENV === 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;
    try {
        if (uri) {
            await mongoose.connect(uri);
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
