import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("picture");

export default singleUpload;
