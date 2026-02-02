const mongoose = require('mongoose');

if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

/** 
 * Global is used here to maintain a cached connection across hot reloads
 * in development and function invocations in serverless environments (Vercel).
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true, // Re-enable buffering as recommended for most use cases
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        };

        console.log('Connecting to MongoDB Atlas...');
        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log('MongoDB connection established');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

module.exports = connectDB;
