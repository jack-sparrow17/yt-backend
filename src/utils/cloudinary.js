import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });

    // file uploaded successfully
    console.log("file uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilepath); // remove locally saved temp file as upload op got failed
    return null;
  }
};

export { uploadOnCloudinary };
