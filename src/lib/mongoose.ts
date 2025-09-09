import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("MongoDB URI doesn't exist");
}

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "flowers_shop",
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};

export default connectMongoDB;

