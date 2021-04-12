import { Router } from "express";
import auth from "./routes/auth.routes";
import product from "./routes/product.routes";
import order from "./routes/order.routes";
import unhandled from "./routes/unhandled.routes";
import payment from "./routes/payment.routes";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	max: 20,
	windowMs: 60 * 60 * 24,
	message: "too many requests from this IP. try again later",
});

export default () => {
	const app = Router();
	auth(app, limiter);
	product(app);
	order(app);
	payment(app);
	unhandled(app);

	return app;
};
