import { Request, Response, NextFunction } from "express";
import config from "../../config";
import { AppError, asyncHandler } from "../../utils";

const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

/**
 * @desc Create Stripe Checkout
 * @route POST /api/v1/payment/stripe
 * @access Private || User
 */

export const PayWithStripe = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const body = {
			source: req.body.token.id,
			amount: req.body.amount,
			currency: "usd",
		};

		stripe.charges.create(body, (stripeErr: any, stripeRes: any) => {
			if (stripeErr) {
				next(new AppError(500, stripeErr));
			} else {
				res.status(200).send({ success: stripeRes });
			}
		});
	}
);
