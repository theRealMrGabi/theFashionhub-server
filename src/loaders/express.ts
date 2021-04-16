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
	const whitelist = ["localhost", "https://thefashionhub.netlify.app"];

	const corsOptions = {
		origin: function (origin: any, callback: any) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
	};

	app.use(cors({ origin: true, credentials: false }));
	//@ts-ignore
	app.options("*", cors(corsOptions));
	app.use(helmet());

	app.use(fileUpload());

	app.use(express.json({ limit: "200mb" }));
	app.use(express.urlencoded({ extended: true }));

	/** Sanitize data input against NoSql query injection */
	app.use(mongoSanitize());

	/** prevent against parameter pollution */
	app.use(hpp());

	app.use(config.api.prefix, routes());
	app.use(globalErrorHandler);
};
