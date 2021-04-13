import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils";

/** Roles and Permission Middleware */
export const roleRestrictedTo = (...roles: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		//@ts-ignore
		if (!roles.includes(req?.user?.role)) {
			return next(
				new AppError(403, "You do not have permission to access this route")
			);
		}

		next();
	};
};
