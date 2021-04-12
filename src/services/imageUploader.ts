import cloudinary from "../utils/cloudinary";
import logger from "../loaders/logger";

// export const UploadImage = async (image: string) => {
export const UploadImage = async (image: any) => {
	try {
		const uploadImage = await cloudinary.v2.uploader.upload(image, {
			upload_preset: "theGadgetHub",
		});
		return uploadImage.url;
	} catch (err) {
		logger.error(err);
	}
};
