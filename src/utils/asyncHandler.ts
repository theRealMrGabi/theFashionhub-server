import { Request, Response, NextFunction } from "express";

/** Handles Async-Await */
export const asyncHandler = (fn: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
