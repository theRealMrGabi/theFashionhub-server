// require("dotenv").config({ path: "../../config.env" });
import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "./../types/auth.types";

const options = {
	expiresIn: "72h",
	issuer: "theGadgetHubCommercestORe",
};

/** Generate JWT Token */
export const generateToken = (user: IUser) => {
	const payload = {
		user: {
			id: user.id,
			role: user.role,
		},
	};
	return jwt.sign(payload, config.jwtSecret, options);
};
