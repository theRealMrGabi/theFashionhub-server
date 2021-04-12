/** Handles API Controller's Error Response */
export class AppError extends Error {
	statusCode: number;
	message: string;
	status?: string;
	isOperational?: boolean;

	constructor(statusCode: number, message: string) {
		super(message);

		this.statusCode = statusCode;
		this.message = message;
		this.isOperational = true;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

		Error.captureStackTrace(this, this.constructor);
	}
}
