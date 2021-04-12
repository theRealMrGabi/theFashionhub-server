import expressLoader from "./express";
import connectDB from "./mongoose";

export default async ({ expressApp }: any) => {
	/**load express config */
	expressLoader({ app: expressApp });

	/**connect database */
	await connectDB();
};
