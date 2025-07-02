import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MONGODB_URI: any = process.env.MONGO_URI;
console.log(MONGODB_URI)

export const connectDB = async () =>{
    if(mongoose.connection.readyState >= 1) return;

    return mongoose.connect(MONGODB_URI)
}