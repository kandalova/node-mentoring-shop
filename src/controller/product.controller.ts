import express, { NextFunction, Request, Response } from "express";
import { getProduct, getProducts } from "../service/product.service";

const productRouter = express.Router();
productRouter.use(express.json());

productRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await getProducts();
		res.send(products);
	}
	catch (err) {
		next(err);
	}
});

productRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const productId = req.params.id;
		const products = await getProduct(productId);
		res.send(products);
	}
	catch (err) {
		next(err);
	}
});

export default productRouter;
