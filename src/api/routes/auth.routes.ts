import { Router } from "express";
import {
	SignupValidator,
	LoginValidator,
	UpdatePasswordValidator,
} from "../../validators";
import {
	SignupUser,
	LoginUser,
	UpdatePassword,
	GetAllUsers,
	GetUserById,
} from "../controllers";
import { Auth, roleRestrictedTo } from "../../middlewares";

const route = Router();

export default (app: Router, limiter?: any) => {
	app.use("/auth", route);
	route.get("/", Auth, roleRestrictedTo("admin", "manager"), GetAllUsers);
	route.get("/:id", Auth, roleRestrictedTo("admin", "manager"), GetUserById);
	route.post("/login", limiter, LoginValidator, LoginUser);
	route.post("/signup", limiter, SignupValidator, SignupUser);
	route.patch(
		"/updatepassword",
		limiter,
		Auth,
		UpdatePasswordValidator,
		UpdatePassword
	);
};
