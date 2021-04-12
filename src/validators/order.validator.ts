import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const ShippingAddressValidator = [
	check("address").not().isEmpty().withMessage("delivery address is required"),
	check("city").not().isEmpty().withMessage("delivery city is required"),
	check("state").not().isEmpty().withMessage("state is required"),
	check("postalCode").not().isEmpty().withMessage("postalCode is required"),
	check("country").not().isEmpty().withMessage("country is required"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];

export const OrderValidator = [
	check("user").not().isEmpty().withMessage("user object is required"),
	check("cartItems").not().isEmpty().withMessage("cart object is required"),
	check("totalPrice")
		.not()
		.isEmpty()
		.withMessage("cart total price is required"),
	check("address").not().isEmpty().withMessage("address object is required"),
	check("status").not().isEmpty().withMessage("delivery status is required"),
	check("shippingCost").not().isEmpty().withMessage("shippingCost is required"),
	check("paymentMethod")
		.not()
		.isEmpty()
		.withMessage("a preffered mode of payment is required"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
