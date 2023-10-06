import { IProduct } from "../scheme/ProductScheme";

export const getTotalPrice = (products: IProduct[]):number =>{
	let result = 0;
	products.map(product=>{
		result=+product.price;
	});
	return result;
}
