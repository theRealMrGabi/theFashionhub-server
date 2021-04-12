import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IProducts, IReviews } from "../types";

const ReviewSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "users",
		},
		review: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Review = model<IReviews>("Review", ReviewSchema);

const ProductSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		quantityInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		// reviews: [Review],
		reviews: [ReviewSchema],
		image: {
			type: [String],
			required: true,
		},
		tags: {
			type: [String],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

ProductSchema.plugin(mongoosePaginate);

export const Product = model<IProducts>("Product", ProductSchema);
