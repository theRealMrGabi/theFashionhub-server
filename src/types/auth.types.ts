import { Document } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	avatar?: string;
	role?: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface passwordProps {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}
