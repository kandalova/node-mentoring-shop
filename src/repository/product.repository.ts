import { productDB } from "../db/db";
import { IProduct } from "../scheme/ProductScheme";

export const findProduct = async (id: string): Promise<IProduct | undefined> => {
	const product = await productDB.find((product) => product.id === id);
	return product;
}

export const findProducts = async (): Promise<IProduct[]> => {
	return productDB;
}
