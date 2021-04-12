import { Request, Response, NextFunction } from "express";
import { IProducts, IUser } from "../../types";
import { Product } from "../../models";
import { UploadImage } from "../../services";
import { AppError, asyncHandler } from "../../utils";
import User from "../../models/User";

/**
 * @desc Create Product
 * @route POST /api/v1/product
 * @access Private/ Admin || Manager
 */

export const CreateProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let {
			name,
			description,
			brand,
			quantityInStock,
			price,
			likes,
			// image,
			tags,
		}: IProducts = req.body;

		//@ts-ignore
		const image = req.files;

		// console.log("request body --->", req.body);
		console.log("request body --->", req);
		// @ts-ignore

		console.log("request file --->", req.files);

		const imgLink = await UploadImage(image);

		//@ts-ignore
		// tags = tags.split(",").map((tag: string) => tag.trim());

		let product = new Product({
			name,
			description,
			brand,
			quantityInStock,
			price,
			likes,
			image: imgLink,
			// tags,
		});

		await product.save();

		res.status(201).json({
			status: "success",
			data: product,
		});
	}
);

/**
 * @desc Get All Products
 * @route GET /api/v1/product
 * @access Public
 */

export const GetAllProducts = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// const products = await Product.find({});
		// const products = await Product.find({ active: true });
		const products = await Product.find({ active: true }).sort({
			createdAt: -1,
		});
		if (products.length) {
			res.status(200).json({
				total: products.length,
				status: "success",
				data: products,
			});
		} else {
			next(new AppError(404, "No product available at the moment"));
		}
	}
);

/**
 * @desc Update Product
 * @route PUT /api/v1/product/:id
 * @access Private/ Admin || Manager
 */

export const UpdateProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			name,
			description,
			brand,
			quantityInStock,
			price,
			image,
			tags,
		}: IProducts = req.body;

		const product = await Product.findById(req.params.id);

		//@ts-ignore
		const imgLink: string = await UploadImage(image);

		if (product) {
			product.name = name;
			product.description = description;
			product.brand = brand;
			product.quantityInStock = quantityInStock;
			product.price = price;
			product.image = imgLink;
			product.tags = tags;

			const updatedProduct = await product.save();
			res.status(201).json({
				status: "updated",
				data: updatedProduct,
			});
		} else {
			next(new AppError(404, "Product not Found"));
		}
	}
);

/**
 * @desc Delete Product
 * @route DELETE /api/v1/product/:id
 * @access Private/ Admin || Manager
 */

export const DeleteProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const product = await Product.findById(req.params.id);

		if (product) {
			await product.remove();
			res.status(200).json({
				status: "product removed",
			});
		} else {
			next(new AppError(500, "Unable to resolve request"));
		}
	}
);

/**
 * @desc Disable Product
 * @route DELETE /api/v1/product/disable/:id
 * @access Private/ Admin || Manager
 */

export const DisableProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		await Product.findByIdAndUpdate(req.params.id, { active: false });
		res.status(200).json({
			status: "success",
			message: "product successfully disabled",
		});
	}
);

/**
 * @desc Review Product
 * @route DELETE /api/v1/product/:id/reviews
 * @access Private/ Admin || Manager
 */

export const ReviewProduct = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		//  hello
		const { review } = req.body;

		const product = await Product.findById(req.params.id);

		if (product) {
			//@ts-ignore
			const alreadyReviewed = product.reviews.find(
				//@ts-ignore
				(r: any) => r.user.toString() === req?.user.id.toString()
			);

			if (alreadyReviewed) {
				next(new AppError(400, "You can't review a product twice"));
			}

			//@ts-ignore
			const user = await User.findById(req.user.id).select("firstName avatar");

			const reviews = {
				name: user?.firstName,
				avatar: user?.avatar,
				review,
				user,
			};

			//@ts-ignore
			product.reviews.push(reviews);

			await product.save();
			res.status(201).json({
				status: "success",
				message: "review successfully added",
			});
			///
		} else {
			next(new AppError(404, "Product not found"));
		}
	}
);
