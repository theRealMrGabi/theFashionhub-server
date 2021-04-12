import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const CartValidator = [
	check("quantity")
		.not()
		.isNumeric()
		.not()
		.isEmpty()
		.withMessage("A minimum quantity of 1 is required for an order"),
	check("totalPrice")
		.not()
		.isNumeric()
		.not()
		.isEmpty()
		.withMessage("Cart order must have a total price"),
	check("products").not().isEmpty().withMessage("a product can't be empty"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
