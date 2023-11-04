import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isAdmin } from "../middleware/isAdmin";
import { userHeaderHandler } from "../middleware/auth";
import { createOrGetCart, createOrder, deleteCart, updateCart } from "../service/cart.service";
import { getPutSchemeError } from "../utils/errors";

const cartRouter = express.Router();
cartRouter.use(express.json());

const putSchema = Joi.object({
	productId: Joi.string().required(),
	count: Joi.number().integer().min(0).max(20).required()
})

const putValidator = async (req: Request, _: Response, next: NextFunction) => {
	try {
		await putSchema.validateAsync(req.body);
		next();
	}
	catch (err) {
		next(getPutSchemeError());
	}
}

cartRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.user_id;
		const cart = await createOrGetCart(userId);
		res.send(cart);
	}
	catch (err) {
		next(err);
	}
});

cartRouter.delete("/", isAdmin, userHeaderHandler, async (req: Request, res: Response, next: NextFunction) => {
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
		const userId = req.user.user_id;
		const order = await createOrder(userId, req.body);
		res.send(order);
	}
	catch (err) {
		next(err);
	}
});

cartRouter.put("/", putValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.user_id;
		const order = await updateCart(userId, req.body);
		res.send(order);
	}
	catch (err) {
		next(err);
	}
});

export default cartRouter;
