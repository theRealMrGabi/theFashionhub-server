import { Router } from "express";
import { PayWithStripe } from "../controllers";
import { Auth } from "../../middlewares";

const route = Router();

export default (app: Router) => {
	app.use("/payment", route);
	route.post("/stripe", Auth, PayWithStripe);
};
