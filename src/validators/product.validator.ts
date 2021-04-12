import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const ProductReviewValidator = [
	check("review")
		.not()
		.isEmpty()
		.withMessage("content is required to be able to post a review"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];

export const ProductValidator = [
	check("name").not().isEmpty().withMessage("product name is required"),
	check("description", "product description is required")
		.not()
		.isEmpty()
		.isLength({ min: 20 })
		.withMessage("product description must have a minimum of 20 characters"),
	check("brand").not().isEmpty().withMessage("product brand name is required"),
	check("quantityInStock")
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage("available amount of stock is required"),
	check("price")
		.not()
		.isEmpty()
		.isNumeric()
		.withMessage("product must have a price"),
	check("image").not().isEmpty().withMessage("product image is required"),
	check("tags").not().isEmpty().withMessage("product tags is required"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
