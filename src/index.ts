import express, { NextFunction, Request, Response } from "express";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import { ResponseError, getForbidenError, getUnauthorizedError } from "./utils/errors.ts";
import { getResponseError } from "./utils/utils.ts";
import { UserModel } from "./scheme/UserScheme.ts";
import { config } from "dotenv";
import { connectDB } from "./config/database.ts";
import userRouter from "./controller/user.controller.ts";

//for seeders
// import { runUserSeeder } from "./seeder/userSeeder.ts";
// import { ProductModel } from "./scheme/ProductScheme.ts";
// import { runProductSeeder } from "./seeder/productSeeder.ts";
//for cart check
// import { CartModel } from "./scheme/CartScheme.ts";


const headerHandler = async (req: Request, _: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id') ?? '';
		if (!userId) {
			next(getForbidenError());
		}
		const user = await UserModel.findById(userId);
		if (!user) {
			next(getUnauthorizedError());
		}
		next();
	}
	catch (err) {
		next(err);
	}
}

const errorHandler = async (err: Error | ResponseError, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof ResponseError) {
		res.status(err.status);
	}
	else {
		res.status(500);
	}
	res.send(await getResponseError(err.message));
}

export const init = (async () => {
	try {
		config();
		const { API_PORT } = process.env;
		const PORT = API_PORT || 3000;

		await connectDB();
		const app = express();

		app.use('/api/profile/cart', headerHandler, cartRouter, errorHandler);
		app.use('/api/products', headerHandler, productRouter, errorHandler);
		app.use('/api/user', userRouter, errorHandler);

		app.listen(PORT, () => {
			console.log(`Server is Fire at http://localhost:${PORT}`);
		});

		//mock data for first run
		// const user = await UserModel.findOne();
		// if (!user) {
		// 	await runUserSeeder();
		// }
		// const product = await ProductModel.findOne();
		// if (!product) {
		// 	await runProductSeeder();
		// }
		//check cart
		// const doc = new CartModel({items: [{ count: 5 }]});
		// console.log('doc', doc);
		// console.log(doc.items[0].ownerDocument()===doc);
	}
	catch (err) {
		console.log(err);
	}
})();
