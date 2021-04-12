import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const SignupValidator = [
	check("firstName")
		.not()
		.isEmpty()
		.withMessage("FirstName is Required")
		.trim()
		.escape(),
	check("lastName")
		.not()
		.isEmpty()
		.withMessage("LastName is Required")
		.trim()
		.escape(),
	check("email", "A valid email is required").isEmail().normalizeEmail(),
	check("password", "Password must have a minimum of 8 characters")
		// .matches(
		// 	/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
		// )
		// .withMessage(
		// 	"Password must have a minimum of 8 characters which must include lowercase, uppercase and a special character"
		// )
		.isLength({ min: 8 }),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];

export const LoginValidator = [
	check("email", "Enter a valid email").isEmail().normalizeEmail(),
	check("password", "password is required").exists(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];

export const UpdatePasswordValidator = [
	check("currentPassword", "current password is required")
		.not()
		.isEmpty()
		.exists(),
	check("newPassword", "new password is required")
		.not()
		.isEmpty()
		.exists()
		.isLength({ min: 8 })
		.withMessage("Password must have a minimum of 8 characters"),
	check(
		"confirmPassword",
		"passwordConfirmation field must have the same value as the password field"
	)
		.exists()
		.custom((value, { req }) => value === req.body.newPassword),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
