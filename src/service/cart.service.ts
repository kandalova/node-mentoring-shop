import { deleteCartItem, findUserCartIdx, getCartByIdx, getCartProductIdx, pushCartItem, updateCartItemCount, updateCartProperty } from "../repository/cart.repository";
import { pushOrder } from "../repository/order.repository";
import { findProduct } from "../repository/product.repository";
import { CartEditableProperties, CartModel, ICartItemByID, ICartResponse, ICartSchema, IDeleteCartResponse } from "../scheme/CartScheme";
import { IOrderInfo } from "../scheme/OrderScheme";
import { ProductModel } from "../scheme/ProductScheme";
import { generateOrder, getCartResponse, getDeleteCartResponse } from "../utils/cartUtils";
import { throwEmptyCart, throwNoCartExists, throwNoProductExists } from "../utils/errors";

export const createOrGetCart = async (userId: string): Promise<ICartSchema> => {
	const userCart = await CartModel.findOne({ user: userId, isDeleted: false });
	if (userCart) {
		return userCart;
		// return getCartResponse(userCart);
	}
	const newCart = await CartModel.create({ user: userId });
	return newCart;
	// return getCartResponse(newCart);
};

export const deleteCart = async (userId: string): Promise<IDeleteCartResponse> => {
	const userCart = await CartModel.findOne({ user: userId, isDeleted: false });
	if (!userCart) {
		throwNoCartExists(userId);
	}
	else {
		userCart.isDeleted = true;
		await userCart.save();
	}
	const response = getDeleteCartResponse();
	return response;
}

export const postCart = async (userId: string): Promise<ICartSchema> => {
	return createOrGetCart(userId);
};

export const getCart = async (userId: string): Promise<ICartSchema> => {
	return createOrGetCart(userId);
}

export const updateCart = async (userId: string, { productId, count }: ICartItemByID): Promise<ICartSchema | undefined> => {
	const userCart = await CartModel.findOne({ user: userId, isDeleted: false });
	const product = await ProductModel.findById(productId);

	if (!product) {
		throwNoProductExists();
	}
	if (!userCart) {
		throwEmptyCart(userId);
	}
	else {
		const indexToUpdate = userCart.items.findIndex(item => item.product.toString() === productId);
		if (indexToUpdate === -1 && count > 0) {
			userCart.items.push({ product: productId, count: count });
		}
		if (indexToUpdate >= 0 && count > 0) {
			userCart.items[indexToUpdate].count = count;
		}
		if (indexToUpdate >= 0 && count === 0) {
			userCart.items.splice(indexToUpdate, 1);
		}
		const updatedCart = (await userCart.save()).populate('items.product');
		return updatedCart;
	}
	// return await getCartResponse(await getCartByIdx(cartIdx));
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
