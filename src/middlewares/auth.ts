require("dotenv").config({ path: "../../config.env" });
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../loaders/logger";
import { AppError } from "../utils";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorization: any = req?.headers["authorization"]?.split(" ");

		if (authorization[0] !== "Bearer")
			return next(new AppError(401, "Authentication failed. Try again"));

		const token = authorization[1];
		if (!token)
			return next(new AppError(401, "Authentication failed. Try again"));

		const verified = await jwt.verify(token, config.jwtSecret);

		//@ts-ignore
		req?.user = verified?.user;
		next();
	} catch (err) {
		logger.error(err);
		return next(new AppError(401, "Authentication failed. Try again"));
	}
};
