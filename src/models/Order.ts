import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IShippingAddress, IOrders, ICart } from "../types";

const ShippingSchema: Schema = new Schema(
	{
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const ShippingAddress = model<IShippingAddress>(
	"ShippingAddress",
	ShippingSchema
);

const CartSchema: Schema = new Schema(
	{
		quantity: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		product: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Product",
		},
	},
	{ timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);

const OrderSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		cartItems: [CartSchema],
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		address: ShippingSchema,
		status: {
			type: String,
			required: true,
			enum: ["Placed", "Cancelled", "Accepted", "Delivered"],
			default: "Placed",
		},
		isCancelled: {
			type: Boolean,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		shippingCost: {
			type: Number,
			required: true,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paidAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);

export const Orders = model<IOrders>("Orders", OrderSchema);
