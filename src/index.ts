import express, { NextFunction, Request, Response } from "express";
import { findUser } from "./repository/user.repository.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import { ResponseError, getForbidenError, getUnauthorizedError } from "./utils/errors.ts";
import { getResponseError } from "./utils/utils.ts";

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


app.listen(PORT, () => {
	console.log(`Server is Fire at http://localhost:${PORT}`);
});
