import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dy1flnpei",
  api_key: "513125984267468",
  api_secret: "HgLCEpMN9dSFsDEa92a2OyOOdjE",
});

const uploadoncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No local file path provided to Cloudinary");
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // delete temp file
    fs.unlinkSync(localFilePath);

    console.log("Uploaded:", response.secure_url);
    return response; // RETURN FULL OBJECT
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export default uploadoncloudinary;
