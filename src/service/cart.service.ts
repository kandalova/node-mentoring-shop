import { CartModel, IPopulatedCartItem, ICartItemByID, ICartResponse, IDeleteCartResponse } from "../scheme/CartScheme";
import { IOrderInfo, OrderModel } from "../scheme/OrderScheme";
import { ProductModel } from "../scheme/ProductScheme";
import { generateOrderDTO, getCartResponse, getDeleteCartResponse, getPopulatedCartResponse } from "../utils/cartUtils";
import { throwEmptyCart, throwNoCartExists, throwNoProductExists } from "../utils/errors";

const findActiveUserCart = async (userId: string) => {
	return await CartModel.findOne({ user: userId, isDeleted: false }).populate<{ items: IPopulatedCartItem[] }>('items.product');
}
const findActiveUserCartOrFail = async (userId: string) => {
	return await CartModel.findOne({ user: userId, isDeleted: false }).orFail(() => throwNoCartExists(userId));
}

const findUserCartWithProductOrFail = async (userId: string) => {
	return await CartModel
		.findOne({ user: userId, isDeleted: false }).populate<{ items: IPopulatedCartItem[] }>('items.product')
		.orFail(() => throwNoCartExists(userId));
}

export const createOrGetCart = async (userId: string): Promise<ICartResponse> => {
	const userCart = await findActiveUserCart(userId);
	if (userCart) {
		return getPopulatedCartResponse(userCart);
	}
	const newCart = await CartModel.create({ user: userId });
	return getCartResponse(newCart);
};

export const deleteCart = async (userId: string): Promise<IDeleteCartResponse> => {
	const userCart = await findActiveUserCartOrFail(userId);
	userCart.isDeleted = true;
	await userCart.save();
	const response = getDeleteCartResponse();
	return response;
}

export const updateCart = async (userId: string, { productId, count }: ICartItemByID): Promise<ICartResponse> => {
	const userCart = await findActiveUserCartOrFail(userId);
	const indexToUpdate = userCart.items.findIndex(item => item.product.toString() === productId);

	if (indexToUpdate === -1 && count > 0) {
		const product = await ProductModel.findById(productId);
		if (!product) {
			throwNoProductExists();
		}
		userCart.items.push({ product: productId, count: count });
	}
	if (indexToUpdate >= 0 && count > 0) {
		userCart.items[indexToUpdate].count = count;
	}
	if (indexToUpdate >= 0 && count === 0) {
		userCart.items.splice(indexToUpdate, 1);
	}
	await userCart.save();
	const updatedCart = await findUserCartWithProductOrFail(userId);
	return getPopulatedCartResponse(updatedCart);
}

export const createOrder = async (userId: string, orderInfo: IOrderInfo) => {
	const userCart = await findUserCartWithProductOrFail(userId);
	if (userCart.items.length === 0) {
		throwEmptyCart(userId);
	}
	const newOrderDTO = generateOrderDTO(userCart, orderInfo);
	const newOrder = await OrderModel.create(newOrderDTO);
	userCart.isDeleted = true;
	await userCart.save();
	return newOrder;
}
