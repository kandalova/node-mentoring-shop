import { deleteCartItem, findUserCart, findUserCartIdx, getCartByIdx, getCartProductIdx, pushCart, pushCartItem, updateCartItemCount, updateCartProperty } from "../repository/cart.repository";
import { pushOrder } from "../repository/order.repository";
import { findProduct } from "../repository/product.repository";
import { CartEditableProperties, ICartItemByID, ICartResponse, IDeleteCartResponse } from "../scheme/CartScheme";
import { IOrderInfo } from "../scheme/OrderScheme";
import { generateCart, generateOrder, getCartResponse, getDeleteCartResponse } from "../utils/cartUtils";
import { throwCartExistsError, throwEmptyCart, throwNoCartExists, throwNoProductExists } from "../utils/errors";



export const createOrGetCart = async (userId: string, isGetOrCreate = false): Promise<ICartResponse> => {
	const userCart = await findUserCart(userId);
	if (userCart && isGetOrCreate) {
		return getCartResponse(userCart);
	}
	if (userCart && !isGetOrCreate) {
		throwCartExistsError(userId);
	}
	const newCart = generateCart(userId);
	await pushCart(newCart);
	return getCartResponse(newCart);
};

export const deleteCart = async (userId: string): Promise<IDeleteCartResponse> => {
	const cartIdx = await findUserCartIdx(userId);
	if (cartIdx === -1) {
		throwNoCartExists(userId);
	}
	await updateCartProperty(cartIdx, CartEditableProperties.IsDeleted, true);
	const response = getDeleteCartResponse();
	return response;
}

export const postCart = async (userId: string): Promise<ICartResponse> => {
	return createOrGetCart(userId);
};

export const getCart = async (userId: string): Promise<ICartResponse> => {
	return createOrGetCart(userId, true);
}

export const updateCart = async (userId: string, { productId, count }: ICartItemByID): Promise<ICartResponse> => {
	const cartIdx = await findUserCartIdx(userId);
	if (cartIdx === -1) {
		throwEmptyCart(userId);
	}
	const productIdx = await getCartProductIdx(cartIdx, productId);
	if (count > 0 && productIdx === -1) {
		const product = await findProduct(productId);
		if (!product) {
			throwNoProductExists();
		}
		else {
			await pushCartItem(cartIdx, { product, count })
		}
	}
	if (count > 0 && productIdx >= 0) {
		await updateCartItemCount(cartIdx, productIdx, count);
	}
	if (count === 0 && productIdx >= 0) {
		await deleteCartItem(cartIdx, productIdx);
	}
	return await getCartResponse(await getCartByIdx(cartIdx));
}

export const createOrder = async (userId: string, orderInfo: IOrderInfo) => {
	const cartIdx = await findUserCartIdx(userId);
	if (cartIdx === -1) {
		throwEmptyCart(userId);
	}
	const cart = await getCartByIdx(cartIdx);
	if (cart.items.length === 0) {
		throwEmptyCart(userId);
	}
	const newOrder = generateOrder(cart, orderInfo);
	await pushOrder(newOrder);
	await updateCartProperty(cartIdx, CartEditableProperties.IsDeleted, true);
	return newOrder;
}
