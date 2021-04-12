require("dotenv").config({ path: "../../config.env" });

declare const process: {
	env: {
		mongoURI: string;
		jwtSecret: string;
		PORT: string;
		LOG_LEVEL: string;
		CLOUDINARY_CLOUD_NAME: string;
		CLOUDINARY_API_KEY: string;
		CLOUDINARY_API_SECRET: string;
		STRIPE_PUBLISHABLE_KEY: string;
		STRIPE_SECRET_KEY: string;
	};
	exit: any;
};

const config = {
	mongoURI: process.env.mongoURI,
	jwtSecret: process.env.jwtSecret,
	PORT: parseInt(process.env.PORT, 10),
	api: {
		prefix: "/api/v1",
	},
	logs: {
		level: process.env.LOG_LEVEL || "silly",
	},
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
	STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

export default config;
