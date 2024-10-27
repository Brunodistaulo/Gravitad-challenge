import mongoose from "mongoose";
import "dotenv/config";

const dbCon = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
    } catch (error:any) {
        throw new Error(error);
    }
};

export default dbCon;