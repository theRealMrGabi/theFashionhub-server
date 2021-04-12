require("dotenv").config({ path: "../../config.env" });
import cloudinary from "cloudinary";
import config from "../config";

/** Cloudinary config */
cloudinary.v2.config({
	cloud_name: config.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_API_KEY,
	api_secret: config.CLOUDINARY_API_SECRET,
});

export default cloudinary;
