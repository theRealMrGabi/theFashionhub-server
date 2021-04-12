import { Document } from "mongoose";

export interface IShippingAddress extends Document {
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

export interface IOrders extends Document {
	user: object;
	cartItems: [object];
	totalPrice: number;
	address: object;
	status: string;
	isCancelled: boolean;
	isDelivered: boolean;
	deliveredAt: Date;
	shippingCost: number;
	isPaid: boolean;
	paymentMethod: string;
	paidAt: Date;
}

export interface ICart extends Document {
	quantity: number;
	image: string;
	name: string;
	price: number;
	product: object;
}
