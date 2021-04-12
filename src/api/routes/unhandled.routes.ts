import { Router, Request, NextFunction } from "express";
import { AppError } from "../../utils";

export default (app: Router) => {
	app.all("*", (req: Request, res, next: NextFunction) => {
		next(new AppError(400, `Can't find ${req.originalUrl} on this server`));
	});
};
