import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IUser } from "../types";

const UserSchema: Schema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			// match: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
		},
		role: {
			type: String,
			enum: ["admin", "manager", "logistics", "user"],
			default: "user",
		},
		avatar: {
			type: String,
		},
	},
	{ timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

const User = model<IUser>("User", UserSchema);

export default User;
