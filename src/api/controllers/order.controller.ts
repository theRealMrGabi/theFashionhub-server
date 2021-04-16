import { Request, Response, NextFunction } from "express";
import { AppError, asyncHandler } from "../../utils";
import { IOrders } from "../../types";
import { Orders } from "../../models";

/**
 * @desc Create Order
 * @route POST /api/v1/order
 * @access Private || User
 */

export const CreateOrder = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			user,
			cartItems,
			totalPrice,
			address,
			status,
			isDelivered,
			deliveredAt,
			shippingCost,
			isPaid,
			paymentMethod,
			paidAt,
		}: IOrders = req.body;

		if (!cartItems?.length) return next(new AppError(404, "No items in cart"));

		const order = new Orders({
			//@ts-ignore
			user: req?.user?.id,
			cartItems,
			totalPrice,
			address,
			status,
			isDelivered,
			deliveredAt,
			shippingCost,
			isPaid,
			paymentMethod,
			paidAt,
		});

		await order.save();

		res.status(201).json({
			status: "success",
			data: order,
		});
	}
);

/**
 * @desc Get All Orders
 * @route GET /api/v1/order
 * @access Private || Admin || Manager || Logistics
 */

export const GetAllOrders = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const orders = await Orders.find({}).sort({ createdAt: -1 });

		if (!orders?.length)
			return next(new AppError(404, "No orders available at the moment"));

		res.status(200).json({
			total: orders?.length,
			status: "success",
			data: orders,
		});
	}
);

/**
 * @desc Get Orders by ID
 * @route GET /api/v1/order/:id
 * @access Private
 */

export const GetOrderById = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await Orders.findById(req?.params?.id);

		if (!order) return next(new AppError(404, "Order doesn't exist"));

		res.status(200).json({
			status: "success",
			data: order,
		});
	}
);

/**
 * @desc Get all orders from a user
 * @route GET /api/v1/order/user/:id
 * @access Private
 */

export const GetSingleUserOrders = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		//@ts-ignore
		const order = await Orders.findById(req?.user?.id);

		if (!order) return next(new AppError(404, "You are yet to make an order"));

		res.status(200).json({
			status: "success",
			data: order,
		});
	}
);

/**
 * @desc Cancel Order
 * @route PUT /api/v1/order/cancel/:id
 * @access Private || User || Manager || Admin
 */
export const CancelOrder = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await Orders.findById(req?.params?.id);

		if (!order) return next(new AppError(404, "Order not found"));

		order.isCancelled = true;
		order.status = "Cancelled";

		await order?.save();

		res.status(200).json({
			status: "success",
			message: "Order successfully cancelled",
		});
	}
);

/**
 * @desc Accept Order
 * @route Put /api/v1/order/accept/:id
 * @access Admin || Manager
 */
export const AcceptOrder = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await Orders.findById(req?.params?.id);

		if (!order) return next(new AppError(404, "Order not found"));

		order.status = "Accepted";
		await order?.save();

		res.status(200).json({
			status: "success",
			message: "Order successfully accepted",
		});
	}
);

/**
 * @desc Accept Order
 * @route GET /api/v1/order/delivery/:id
 * @access Admin || Manager || logistics
 */
export const DeliveryStatus = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const order = await Orders.findById(req?.params?.id);
		if (!order) return next(new AppError(404, "Order not found"));

		order.status = "Delivered";
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const deliveredOrder = await order?.save();

		res.status(201).json({
			status: "success",
			message: "Order successfully delivered",
			data: deliveredOrder,
		});
	}
);

/**
 * @desc Accept Order
 * @route GET /api/v1/order/accept/:id
 * @access Admin || Manager
 */
// export const UpdatePayment = asyncHandler(
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		const order = await Orders.findById(req.params.id);

// 		// if (order) {
// 		// 	(order.status = "Delivered"),
// 		// 		(order.isDelivered = true),
// 		// 		(order.deliveredAt = Date.now());
// 		// }

// 		// const deliveredOrder = await order?.save();
// 		// await Orders.findByIdAndUpdate(req.params.id, {
// 		// 	status: "Delivered",
// 		// 	isDelivered: true,
// 		// 	deliveredAt: Date.now(),
// 		// });

// 		res.status(200).json({
// 			status: "success",
// 			message: "Order successfully delivered",
// 			// data: deliveredOrder,
// 		});
// 	}
// );
