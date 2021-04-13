import { Request, Response, NextFunction } from "express";
import { IUser, ILogin, passwordProps } from "../../types";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import User from "../../models/User";
import logger from "../../loaders/logger";
import { AppError, generateToken, asyncHandler } from "../../utils";

/**
 * @desc Create User
 * @route POST /api/v1/auth/signup
 * @access Public
 */

export const SignupUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, firstName, lastName, password, role }: IUser = req?.body;

		let user = await User.findOne({ email });
		if (user) return next(new AppError(400, "Unable to resolve request"));

		const avatar = gravatar.url(email, {
			s: "200",
			r: "pg",
			d: "mm",
		});

		user = new User({
			email,
			firstName,
			lastName,
			password,
			avatar,
			role,
		});

		const salt = await bcrypt.genSalt(12);
		user.password = await bcrypt.hash(password, salt);

		/**
		 * the above could be refactored to below
		 * user.password = await bcrypt.hash(password, 12)
		 */

		await user.save();

		res.status(201).json({
			data: {
				status: "success",
				token: generateToken(user),
				message: "Signup Successful",
				user: {
					email,
					firstName,
					lastName,
					avatar,
				},
			},
		});
	}
);

/**
 * @desc Login User
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const LoginUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password }: ILogin = req?.body;

		const user = await User.findOne({ email });

		if (!user) return next(new AppError(400, "Invalid Login Credentials"));

		const validPassword = await bcrypt.compare(password, user.password);

		if (!validPassword)
			return next(new AppError(400, "Invalid Login Credentials"));

		return res.status(200).json({
			data: {
				status: "success",
				token: generateToken(user),
			},
		});
	}
);

/**
 * @desc Update Password
 * @route PATCH /api/v1/auth/updatepassword
 * @access Private
 */
export const UpdatePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { currentPassword, newPassword }: passwordProps = req?.body;

	delete req?.body?.confirmPassword;

	try {
		//@ts-ignore
		const user: IUser = await User.findById(req?.user?.id);

		const validPassword = await bcrypt.compare(currentPassword, user?.password);

		if (!validPassword) return next(new AppError(406, "Invalid Credentials"));

		let password = await bcrypt.hash(newPassword, 12);

		//@ts-ignore
		await User.findByIdAndUpdate(user?.id, password, {
			new: true,
			runValidators: true,
		});

		res.status(201).json({
			status: "success",
			message: "password updated",
		});
	} catch (err) {
		logger.error(err);
		return next(new AppError(400, "Unable to change password"));
	}
};

/**
 * @desc GET ALL USERS
 * @route GET /api/v1/auth/
 * @access Private / ADMIN / MANAGER
 */
export const GetAllUsers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const user = await User.find({})
			.sort({ createdAt: -1 })
			.select("-password");

		if (!user) return next(new AppError(404, "No user exist at the moment"));

		res.status(200).json({
			total: user?.length,
			status: "success",
			data: user,
		});
	}
);

/**
 * @desc GET USER BY ID
 * @route GET /api/v1/auth/:id
 * @access Private / ADMIN / MANAGER
 */
export const GetUserById = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		//@ts-ignore
		const user: IUser = await User.findById(req?.user?.id).select(
			"-password -role"
		);
		if (!user) return next(new AppError(404, "User not found"));

		res.status(200).json({
			status: "success",
			data: user,
		});
	}
);
