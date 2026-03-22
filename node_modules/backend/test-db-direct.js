import { Userdetail } from "./src/Models/Userdetail.models.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to database
mongoose.connect(`${process.env.MONGODB_URL}/${process.env.Project_Name}`)
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// Test data
const testData = {
    fullName: "Test User",
    role: "CEO",
    companyName: "Test Company",
    address: "123 Test Street",
    country: "India",
    state: "Test State",
    city: "Test City",
    postcode: "123456",
    contactsize: 100,
    industrytype: "Technology"
};

console.log("\n📝 Testing Userdetail.create() with data:");
console.log(JSON.stringify(testData, null, 2));

// Wait for DB connection
setTimeout(async () => {
    try {
        const result = await Userdetail.create(testData);
        console.log("\n✅ SUCCESS! Created user detail:");
        console.log(result);
        process.exit(0);
    } catch (error) {
        console.error("\n❌ ERROR:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);

        if (error.name === 'ValidationError') {
            console.error("\nValidation errors:");
            Object.keys(error.errors).forEach(key => {
                console.error(`  - ${key}: ${error.errors[key].message}`);
            });
        }

        console.error("\nFull error:", error);
        process.exit(1);
    }
}, 2000);
