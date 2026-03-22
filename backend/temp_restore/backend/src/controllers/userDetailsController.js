import { Userdetail } from "../Models/Userdetail.models.js";

export const userDetails = async (req, res) => {
    console.log("\n🔵 userDetails endpoint called");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    try {
        const { fullName, role, companyName, address, country, state, city, postcode, contactsize, industrytype } = req.body
        console.log(req.body)

        if (!fullName || !role || !companyName || !address || !state || !city || !postcode || !contactsize || !industrytype) {
            return res.status(401).json({ message: "Data is Incomplete, first compltete it" })
        }
        const Userdetails = await Userdetail.create({
            fullName,
            role,
            companyName,
            address,
            country: country || "India",
            state,
            city,
            postcode,
            contactsize: Number(contactsize), // Convert string to number
            industrytype,
        })
        return res.status(200).json({ message: "User details saved Successfully" })
    } catch (error) {
        console.error("❌ Error in userDetails controller:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);

        // Log validation errors if it's a Mongoose validation error
        if (error.name === 'ValidationError') {
            console.error("Validation errors:", JSON.stringify(error.errors, null, 2));
        }

        console.error("Full error:", error);
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong while taking your details",
            error: error.message,
            errorType: error.name
        })
    }
}

