import express, { NextFunction, Request, Response } from "express";
import { findUser } from "./repository/user.repository.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import { ResponseError, getForbidenError, getUnauthorizedError } from "./utils/errors.ts";
import { getResponseError } from "./utils/utils.ts";
import { connect, disconnect } from "mongoose";
// import { UserModel } from "./scheme/UserScheme.ts";
// import { runUserSeeder } from "./seeder/userSeeder.ts";
// import { ProductModel } from "./scheme/ProductScheme.ts";
// import { runProductSeeder } from "./seeder/productSeeder.ts";

export const app = express();
const PORT = 3000;

const headerHandler = async (req: Request, _: Response, next: NextFunction) => {
	const userId = req.header('x-user-id') ?? '';
	if (!userId) {
		next(getForbidenError());
	}
	const user = await findUser(userId);
	if (!user) {
		next(getUnauthorizedError());
	}
	next();
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

app.use('/api/profile/cart', headerHandler, cartRouter, errorHandler);
app.use('/api/products', headerHandler, productRouter, errorHandler);

export const init = (async () => {
	try {
		await connect("mongodb://127.0.0.1:27017/NM_SHOP");
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
	}
	catch (err) {
		console.log(err);
	}
})();

// listen (ctrl-c)
process.on("SIGINT", async () => {
	await disconnect();
	console.log("Server is disconnected");
	process.exit(); 
});
