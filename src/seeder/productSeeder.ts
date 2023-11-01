import { productDB } from "../db/db";
import { ProductModel } from "../scheme/ProductScheme";

export const runProductSeeder = async () => {
	productDB.forEach(async ({ title, description, price }) => {
		const newProduct = new ProductModel({ title, description, price });
		await newProduct.save();
	});
}
