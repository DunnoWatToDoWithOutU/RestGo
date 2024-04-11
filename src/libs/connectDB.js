import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        const opts = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        }
    
        cached.promise = mongoose.connect(MONGO_URI, opts).then(() => {
          console.log("MongoDB Connected");
          return mongoose.connection;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectDB;
