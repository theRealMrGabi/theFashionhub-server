import { Router } from "express";
import { Auth, roleRestrictedTo } from "../../middlewares";
import {
	GetAllOrders,
	CreateOrder,
	GetOrderById,
	GetSingleUserOrders,
	CancelOrder,
	AcceptOrder,
	DeliveryStatus,
} from "../controllers";
import { OrderValidator } from "../../validators";

const route = Router();

export default (app: Router) => {
	app.use("/order", route);
	route.post(
		"/",
		Auth,
		OrderValidator,
		roleRestrictedTo("user, manager"),
		CreateOrder
	);
	route.get(
		"/",
		Auth,
		roleRestrictedTo("admin", "manager", "logistics"),
		GetAllOrders
	);
	route.get("/:id", Auth, GetOrderById);
	route.get("/user/:id", Auth, GetSingleUserOrders);
	route.put(
		"/cancel/:id",
		roleRestrictedTo("admin", "manager", "user"),
		Auth,
		CancelOrder
	);
	route.put(
		"/accept/:id",
		roleRestrictedTo("admin", "manager"),
		Auth,
		AcceptOrder
	);
	route.put(
		"/delivery/:id",
		roleRestrictedTo("admin", "manager", "logistics"),
		Auth,
		DeliveryStatus
	);
	// route.delete("/", Auth, CancelOrders);
};
