import mongoose from "mongoose";

export const connnectdb = async() => {
try {
    mongoose.connect(`${process.env.MONGODB_URL}/${process.env.Project_Name}`)
    console.log("Database Connected Successfully")
} catch (error) {
    console.log("Something went Wrong while connecting With you Database", error)
}
}