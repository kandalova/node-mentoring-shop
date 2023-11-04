import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/database.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import userRouter from "./controller/user.controller.ts";
import { CurrentUser, verifyToken } from "./middleware/auth.ts";
import { errorHandler } from "./middleware/error.ts";

//for seeders
// import { ProductModel } from "./scheme/ProductScheme.ts";
// import { runProductSeeder } from "./seeder/productSeeder.ts";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			user: CurrentUser
		}
	}
}

export const init = (async () => {
	try {
		config();
		const { API_PORT } = process.env;
		const PORT = API_PORT || 3000;

		await connectDB();
		const app = express();

		app.use('/api', verifyToken);
		app.use('/api/profile/cart', cartRouter);
		app.use('/api/products', productRouter);
		app.use('/user', userRouter);
		app.use(errorHandler);


		app.listen(PORT, () => {
			console.log(`Server is Fire at http://localhost:${PORT}`);
		});

		//mock product data for first run
		// const product = await ProductModel.findOne();
		// if (!product) {
		// 	await runProductSeeder();
		// }
	}
	catch (err) {
		console.log(err);
	}
})();
