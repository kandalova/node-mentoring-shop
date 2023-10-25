import { DI } from "..";
import { Cart } from "../entities/cart";
import { CartItem } from "../entities/cartItem";
import { Delivery } from "../entities/delivery";
import { Order } from "../entities/order";
import { Payment } from "../entities/payment";
import { ICartItemByID } from "../scheme/CartScheme";
import { IOrderInfo } from "../scheme/OrderScheme";
import { getCartResponse, getDeleteCartResponse, getOrderDto, getOrderResponse } from "../utils/cartUtils";
import { throwCartExistsError, throwEmptyCart, throwNoCartExists, throwNoProductExists } from "../utils/errors";

const findUserActiveCart = async (userId: string) => {
	return await DI.cartRepository.findOne(
		{ user: userId, isDeleted: false },
		{ fields: ['id', 'cartItems'], populate: ['cartItems', 'cartItems.product'] });
}


export const createOrGetCart = async (userId: string, isGetOrCreate = false) => {
	const userCart = await findUserActiveCart(userId);
	if (userCart && isGetOrCreate) {
		return getCartResponse(userCart);
	}
	if (userCart && !isGetOrCreate) {
		throwCartExistsError(userId);
	}
	const newCart = new Cart(userId);
	await DI.cartRepository.persistAndFlush(newCart);
	return getCartResponse(newCart);
};

export const deleteCart = async (userId: string) => {
	const userCart = await findUserActiveCart(userId);
	if (!userCart) {
		throwNoCartExists(userId);
	}
	else {
		userCart.isDeleted = true;
		await DI.cartRepository.persistAndFlush(userCart);
		const response = getDeleteCartResponse();
		return response;
	}
}

// export const postCart = async (userId: string): Promise<ICartResponse> => {
// 	return createOrGetCart(userId);
// };

// export const getCart = async (userId: string): Promise<ICartResponse> => {
// 	return createOrGetCart(userId, true);
// }

export const updateCart = async (userId: string, { productId, count }: ICartItemByID) => {
	const cart = await findUserActiveCart(userId);
	if (!cart) {
		throwEmptyCart(userId);
	}
	else {
		const cartItem = cart.cartItems.$.find((item) => item.product.id === productId);

		if (count > 0 && !cartItem) {
			const product = await DI.productRepository.findOneOrFail(productId);
			if (!product) {
				throwNoProductExists();
			}
			else {
				const newCartItem = new CartItem({ cartId: cart.id, productId: productId, count: count });
				cart.cartItems.add(newCartItem);
			}
		}
		if (count > 0 && cartItem) {
			cartItem.count = count;

		}
		if (count === 0 && cartItem) {
			cart.cartItems.remove(cartItem);
		}
		await DI.cartRepository.flush();
		return getCartResponse(cart);

	}
}

export const createOrder = async (userId: string, orderInfo: IOrderInfo) => {
	const userCart = await findUserActiveCart(userId);
	if (!userCart) {
		throwEmptyCart(userId);
	}
	else if (userCart.cartItems.length === 0) {
		throwEmptyCart(userId);
	}
	else {
		const dto = await getOrderDto(userCart, orderInfo);
		const newPayment = new Payment(dto.payment);
		const newDelivery = new Delivery(dto.delivery);
		DI.em.persist([newPayment, newDelivery]);
		// const newOrder = new Order(dto);
		const newOrder = new Order(
			{
				cartId: userCart.id,
				total: dto.total,
				comments: dto.comments,
				paymentId: newPayment.id,
				deliveryId: newDelivery.id
			});
		userCart.isDeleted = true;
		DI.em.persist([newOrder, userCart, newPayment, newDelivery]);
		await DI.em.flush();
		// await DI.cartRepository.persistAndFlush(userCart);
		return await getOrderResponse(newOrder);
	}
}
