require("dotenv").config({ path: "../../config.env" });
import winston from "winston";
import config from "../config";

const transports = [];
if (process.env.NODE_ENV !== "production") {
	transports.push(new winston.transports.Console());
} else {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.cli(),
				winston.format.splat()
			),
		})
	);
}

/** App Logger based on different error priority levels */
const logger = winston.createLogger({
	level: config.logs.level,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss",
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: "error.log",
			level: "error",
			format: winston.format.json(),
		}),
		new winston.transports.Http({
			level: "warn",
			format: winston.format.json(),
		}),
		new winston.transports.Console({
			level: "info",
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
		}),
	],
});

export default logger;
