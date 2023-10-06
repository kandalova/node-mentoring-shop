import { productDB } from "..";
import { IProduct } from "../scheme/ProductScheme";

export const getTotalPrice = (products: IProduct[]):number =>{
	let result = 0;
	products.map(product=>{
		result=+product.price;
	});
	return result;
}


export const findProduct = async (id: string):Promise<IProduct | undefined>=>{
	const product = await productDB.find((product) => product.id === id);
	return product;
}
