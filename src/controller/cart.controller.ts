import express, { NextFunction, Request, Response } from "express";
import { createOrGetCart, createOrder, deleteCart, updateCart } from "../service/cart.service";
// import { promiseHandler } from "../utils/utils";

const cartRouter = express.Router();
cartRouter.use(express.json());

// cartRouter.post("/", async (req:Request, res:Response, next:NextFunction) => {
// 		const userId = req.header('x-user-id')!;
// 		const cart = await promiseHandler(createCart(userId), next);
// 		res.status(201).send(cart);	
// });

cartRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id')!;
		const cart = await createOrGetCart(userId, true);
		res.send(cart);
	}
	catch (err) {
		next(err);
	}

});

cartRouter.delete("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id')!;
		const data = await deleteCart(userId);
		res.send(data);
	}
	catch (err) {
		next(err);
	}
});

cartRouter.post("/checkout", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id')!;
		const order = await createOrder(userId, req.body);
		res.send(order);
	}
	catch (err) {
		next(err);
	}
});

cartRouter.put("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id')!;
		const order = await updateCart(userId, req.body);
		res.send(order);
	}
	catch (err) {
		next(err);
	}
});

export default cartRouter;
