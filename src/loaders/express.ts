import express, { Application } from "express";
import routes from "../api";
import config from "../config";
import helmet from "helmet";
import { globalErrorHandler } from "../utils";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import fileUpload from "express-fileupload";
import cors from "cors";

/** Express Startup Files */
export default ({ app }: { app: Application }) => {
	// app.use(express.json());
	// app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(helmet());

	app.use(fileUpload());
	app.use(express.json({ limit: "60mb" }));
	app.use(express.urlencoded({ limit: "60mb", extended: true }));

	/** Sanitize data input against NoSql query injection */
	app.use(mongoSanitize());

	/** prevent against parameter pollution */
	app.use(hpp());

	app.use(config.api.prefix, routes());
	app.use(globalErrorHandler);
};
