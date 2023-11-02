import { cartDB } from "../db/db";
import { IPopulatedCartItem } from "../scheme/CartScheme";
import { getUUID } from "../utils/utils";

interface ICart {
	id: string; // uuid
	userId: string;
	isDeleted: boolean;
	items: IPopulatedCartItem[];
}

enum CartEditableProperties {
	Items = 'items',
	IsDeleted = "isDeleted"
}

export const generateCart = (userId: string): ICart => {
	const newCart: ICart = {
		id: getUUID(),
		userId: userId,
		isDeleted: false,
		items: [],
	}
	return newCart;
}

export const pushCart = async (cart: ICart) => {
	await cartDB.push(cart);
}

export const findUserCart = async (userId: string): Promise<ICart> => {
	const cart = await cartDB.find((cart) => cart.userId === userId && !cart.isDeleted);
	return cart;
}

export const findUserCartIdx = async (userId: string) => {
	const index = await cartDB.findIndex((cart) => cart.userId === userId && !cart.isDeleted);
	return index;
}

export const findUserCartIdxByID = async (userId: string, cartId: string) => {
	const index = await cartDB.findIndex((cart) => cart.userId === userId && cart.id === cartId && !cart.isDeleted);
	return index;
}

export const updateCartProperty = async (cartIdx: number, property: CartEditableProperties, value: boolean | IPopulatedCartItem[]) => {
	cartDB[cartIdx][property] = value;
}

export const getCartByIdx = async (cartIdx: number): Promise<ICart> => {
	return await cartDB[cartIdx];
}
export const getCartProductIdx = async (cartIdx: number, productId: string) => {
	const index = await cartDB[cartIdx].items.findIndex((item: IPopulatedCartItem) => item.product.product === productId);
	return index;
}

export const pushCartItem = async (cartIdx: number, product: IPopulatedCartItem) => {
	await cartDB[cartIdx].items.push(product)
}

export const updateCartItemCount = async (cartIdx: number, productIdx: number, count: number) => {
	const cartItem = cartDB[cartIdx].items[productIdx];
	cartItem.count = count;
}

export const deleteCartItem = async (cartIdx: number, productIdx: number) => {
	const cartItems = cartDB[cartIdx].items;
	await cartItems.splice(productIdx, 1);
}
