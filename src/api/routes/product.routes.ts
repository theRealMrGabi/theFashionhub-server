import { Router } from "express";
import { Auth, roleRestrictedTo } from "../../middlewares";
import {
	CreateProduct,
	GetAllProducts,
	UpdateProduct,
	DeleteProduct,
	DisableProduct,
	ReviewProduct,
} from "../controllers";
import { ProductReviewValidator, ProductValidator } from "../../validators";

const route = Router();

export default (app: Router) => {
	app.use("/product", route);
	route.get("/", GetAllProducts);
	route.post(
		"/",
		Auth,
		roleRestrictedTo("admin", "manager"),
		ProductValidator,
		CreateProduct
	);
	route.put("/:id", Auth, roleRestrictedTo("admin", "manager"), UpdateProduct);
	route.delete(
		"/:id",
		Auth,
		roleRestrictedTo("admin", "manager"),
		DeleteProduct
	);
	route.delete(
		"/disable/:id",
		Auth,
		roleRestrictedTo("admin", "manager"),
		DisableProduct
	);
	route.post(
		"/:id/reviews",
		Auth,
		ProductReviewValidator,
		roleRestrictedTo("admin", "manager", "user"),
		ReviewProduct
	);
};
