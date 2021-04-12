import { FileArray } from "express-fileupload";
import { Document } from "mongoose";

export interface IProducts extends Document {
	name: string;
	description: string;
	brand: string;
	quantityInStock: number;
	price: number;
	likes: number;
	reviews?: object;
	image: string;
	// image: FileArray;
	active: boolean;
	tags: [string];
}

export interface IReviews extends Document {
	users: [string];
	review: [string];
	name: string;
	avatar: string;
}
