import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

mongoose.set("debug", true);

/** MongoDB Connection Setup */
const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		logger.info("✅✳️ DB Connection Successful ❇️");
	} catch (err) {
		logger.error(err?.message);
		process.exit(1);
	}
};

export default connectDB;
