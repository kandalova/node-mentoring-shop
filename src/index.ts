import {users} from "./db/user.db.js"
import {products} from "./db/product.db.js"
import {carts} from "./db/cart.db.js"
import {orders} from "./db/order.db.js"
import express, { NextFunction, Request, Response } from "express";
import { findUser } from "./repository/user.repository.ts";
import cartRouter from "./controller/cart.controller.ts";
import { ResponseError, getForbidenError, getUnauthorizedError } from "./utils/errors.ts";
import { getResponseError } from "./utils/utils.ts";

export const userDB = users;
export const productDB = products;
export const cartDB = carts;
export const orderDB = orders;

export const app = express();
const PORT = 3000;

const headerHandler = async (req:Request, _: Response, next: NextFunction) => {
  const userId = req.header('x-user-id') ?? '';
	if(!userId){
		next(getForbidenError());
	}
	const user = await findUser(userId);
	if(!user){
		next(getUnauthorizedError());
	}
	next();	
}

const errorHandler = async (err:Error|ResponseError, _req:Request, res: Response, _next: NextFunction) => {
	if(err instanceof ResponseError){
		res.status(err.status);
	}
	else{
		res.status(500);
	}
	res.send(await getResponseError(err.message));
}

app.use('/api/profile/cart', headerHandler, cartRouter, errorHandler);


app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});
