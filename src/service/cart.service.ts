import { findUserCart, findUserCartIdx, findUserCartIdxByID, getCartByIdx, pushCart, updateCartProperty } from "../repository/cart.repository";
import { pushOrder } from "../repository/order.repository";
import { CartEditableProperties, ICartResponse, IDeleteCartResponse, OmitCart } from "../scheme/CartScheme";
import { IOrderInfo } from "../scheme/OrderScheme";
import { generateCart, generateOrder, getCartResponse, getDeleteCartResponse } from "../utils/cartUtils";
import { getNoCartExists, throwCartExistsError, throwEmptyCart, throwNoCartExists, throwNoCartExistsById } from "../utils/errors";


const createCart = async (userId: string, isGetOrCreate = false): Promise<ICartResponse> => {
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

export const deleteCart2 = async (userId: string): Promise<IDeleteCartResponse> => {
	// return new Promise<IDeleteCartResponse>(async (res, rej) => {
		const cartIdx = await findUserCartIdx(userId);
		if (cartIdx === -1) {
			throwNoCartExists(userId);
		}
		await updateCartProperty(cartIdx, CartEditableProperties.IsDeleted, true);
		const response = getDeleteCartResponse();
		return response;

	// })
}

export const deleteCart = async (userId: string): Promise<IDeleteCartResponse> => {
	return deleteCart2(userId);
};

export const postCart = async (userId: string): Promise<ICartResponse> => {
	return createCart(userId);
};

export const getCart = async (userId: string): Promise<ICartResponse> => {
	return createCart(userId, true);
}

export const updateCart = async (userId: string, updatedCart: OmitCart): Promise<OmitCart> => {
	const cartIdx = await findUserCartIdxByID(userId, updatedCart.id);
	if (cartIdx === -1) {
		throwNoCartExistsById(userId, updatedCart.id);
	}
	await updateCartProperty(cartIdx, CartEditableProperties.Items, updatedCart.items);
	return await getCartByIdx(cartIdx);
}

export const createOrder = async (userId: string, orderInfo: IOrderInfo) => {
	const cartIdx = await findUserCartIdx(userId);
	if (cartIdx === -1) {
		throwEmptyCart(userId);
	}
	const cart = await getCartByIdx(cartIdx);
	const newOrder = generateOrder(cart, orderInfo);
	await pushOrder(newOrder);
	await updateCartProperty(cartIdx, CartEditableProperties.IsDeleted, true);
	return newOrder;
}
