import { IProductResponse, IProductsResponse, ProductModel } from "../scheme/ProductScheme";
import { throwNoProductExists } from "../utils/errors";
import { getProductResponse, getProductsResponse } from "../utils/productUtils";

export const getProduct = async (productId: string): Promise<IProductResponse | undefined> => {
	const product = await ProductModel.findById(productId);
	if (!product) {
		throwNoProductExists();
	}
	else {
		return getProductResponse(product);
	}
};

export const getProducts = async (): Promise<IProductsResponse> => {
	const products = await ProductModel.find();
	return getProductsResponse(products);
};
