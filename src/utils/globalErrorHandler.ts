import { Request, Response, NextFunction } from "express";
import logger from "../loaders/logger";
import { AppError } from "./appError";

/** Handles Global Error */
export const globalErrorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		logger.error(err?.stack);

		err.statusCode = err?.statusCode || 500;
		err.status = err?.status || "error";

		res.status(err?.statusCode).json({
			status: err?.status,
			message: err?.message || "Something went wrong",
		});
	} catch (err) {
		next(err);
	}
};
