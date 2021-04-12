import { Document } from "mongoose";

declare module "winston";

type IAppError = {
	message: string;
	statusCode: number;
	status: string;
	isOperational: boolean;
	status: string;
};

type loginProps = {
	email: string;
	password: string;
};

type passwordProps = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};
