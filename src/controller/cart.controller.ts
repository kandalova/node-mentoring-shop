import express, { NextFunction, Request, Response } from "express";
import { deleteCart, getCart, postCart } from "../service/cart.service";
import { promiseHandler } from "../utils/utils";

const cartRouter = express.Router(); 
cartRouter.use(express.json());

cartRouter.post("/", async (req:Request, res:Response, next:NextFunction) => {
		const userId = req.header('x-user-id')!;
		const cart = await promiseHandler(postCart(userId), next);
		res.status(201).send(cart);	
});

cartRouter.get("/", async (req:Request, res:Response, next:NextFunction) => {
	const userId = req.header('x-user-id')!;
	const cart = await promiseHandler(getCart(userId), next);
	res.send(cart);
});

cartRouter.delete("/", async (req:Request, res:Response, next:NextFunction) => {
	const userId = req.header('x-user-id')!;
	const data = await promiseHandler(deleteCart(userId), next);
	res.send(data);
});

export default cartRouter;
