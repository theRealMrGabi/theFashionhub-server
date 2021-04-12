require("dotenv").config({ path: "../config.env" });
import express from "express";
import config from "./config";
import logger from "./loaders/logger";

const startServer = async () => {
	const app = express();

	await require("./loaders").default({
		expressApp: app,
	});

	//@ts-ignore
	app.listen(config.PORT, (err: any) => {
		if (err) {
			logger.error(err);
			process.exit(1);
		} else {
			logger.info(`server running on port ${config.PORT}`);
		}
	});
};

startServer();
