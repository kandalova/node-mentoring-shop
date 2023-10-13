import { IProduct, IProductResponse, IProductsResponse } from "../scheme/ProductScheme";

export const getProductResponse = (product: IProduct): IProductResponse => {
	const response: IProductResponse = {
		data: product,
		error: null,
	}
	return response;
}

export const getProductsResponse = (products: IProduct[]): IProductsResponse => {
	const response: IProductsResponse = {
		data: products,
		error: null,
	}
	return response;
}
