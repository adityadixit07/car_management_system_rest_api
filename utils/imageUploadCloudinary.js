import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/imageUploadCloudinary.js";

// Configure the Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cars/", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Allowed image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize images (optional)
  },
});

// Set up multer with the Cloudinary storage
const upload = multer({ storage });

export default upload;
