/**
 * This script will load 1 month of query data to any project.
 * it returns an error:
 *          MongoServerError: E11000 duplicate key error collection: test.queries index: number_1 dup key
 * but still logs a alot af data at once
 *
 * repalce userID and project ID with the project you want to create mock data for
 */

const { mongoose, Schema } = require('mongoose');
require('dotenv/config');

const connectDB = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            // eslint-disable-next-line no-console
            console.log('[Server] MongoDB connection successful');
        } else throw new Error(`[Server] MONGO_URI field missing in .env`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`[Server] MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};

const querySchema = new Schema({
    userID: { type: String, required: true },
    projectID: { type: String, required: true },
    number: { type: Number, unique: true, required: true },
    depth: { type: Number, required: false },
    complexity: { type: Number, required: false },
    success: { type: Boolean, required: true },
    tokens: { type: Number },
    timestamp: { type: Number, required: true },
    loggedOn: { type: Number, required: true },
    latency: { type: Number },
});

QueryDB = mongoose.model('Query', querySchema, 'queries');

const currentTime = new Date().valueOf();
let time = currentTime - 2629800000; //one month of data
const max = 900000; // 15 min
const min = 60000; // 10 min

let number = 0;

async function runScript() {
    await connectDB();
    while (time < currentTime) {
        console.log('timeleft: ', currentTime - time);
        new QueryDB({
            projectID: '<projectID>',
            complexity: Math.floor(Math.random() * (50 - 5 + 1) + 5),
            depth: Math.floor(Math.random() * (7 - 2 + 1) + 2),
            tokens: Math.floor(Math.random() * (30 - 5 + 1) + 5),
            success: Math.random() > 0.5 ? true : false,
            timestamp: time,
            loggedOn: time + 200,
            latency: Math.floor(Math.random() * (300 - 30 + 1) + 30),
            userID: '<userID>',
            number: number++,
        })
            .save()
            .catch((err) => console.log(err));

        const wait = Math.floor(Math.random() * (max - min + 1) + min);
        time += wait;
    }
}

runScript();
