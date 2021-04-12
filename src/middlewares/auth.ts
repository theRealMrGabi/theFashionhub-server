require("dotenv").config({ path: "../../config.env" });
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../loaders/logger";
import { AppError } from "../utils";

export const Auth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return next(new AppError(401, "Authentication error. Token required"));
	}

	try {
		const isAuthenticated = jwt.verify(token, config.jwtSecret);

		//@ts-ignore
		req.user = isAuthenticated.user;
		next();
	} catch (err) {
		logger.error(err);
		return next(new AppError(401, "Authentication failed. Try again"));
	}
};
