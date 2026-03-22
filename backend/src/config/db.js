import mongoose from "mongoose";

export const connnectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Something went Wrong while connecting With you Database", error)
    }
}