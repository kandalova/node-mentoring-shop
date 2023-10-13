import { ICart, ICartItem, ICartResponse, IDeleteCartResponse, OmitCart } from "../scheme/CartScheme";
import { IOrderInfo, IOrder, OrderStatuses } from "../scheme/OrderScheme";
import { createDeepCopy, getUUID } from "./utils";

export const generateCart = (userId: string): ICart => {
	const newCart: ICart = {
		id: getUUID(),
		userId: userId,
		isDeleted: false,
		items: [],
	}
	return newCart;
}

export const getOmitCart = ({ id, items }: ICart): OmitCart => {
	return { id, items };
}

export const getTotalPrice = (items: ICartItem[]): number => {
	let totalPrice = 0;
	items.map((item) => {
		const price = item.product.price;
		totalPrice += price * item.count;
	});
	return totalPrice;
}

export const getCartResponse = (cart: ICart): ICartResponse => {
	const omitCart = getOmitCart(cart);
	const totalPrice = getTotalPrice(cart.items);
	const response: ICartResponse = {
		data: {
			cart: omitCart,
			totalPrice: totalPrice
		},
		error: null,
	}
	return response;
}

export const getDeleteCartResponse = (): IDeleteCartResponse => {
	const response: IDeleteCartResponse = {
		data: {
			success: true,
		},
		error: null,
	}
	return response;
}

export const generateOrder = (cart: ICart, orderInfo: IOrderInfo): IOrder => {
	const newOrder: IOrder = {
		id: getUUID(),
		userId: cart.userId,
		cartId: cart.id,
		items: createDeepCopy(cart.items),
		payment: {
			type: orderInfo.payment.type,
			address: orderInfo.payment.address,
			creditCard: orderInfo.payment.creditCard,
		},
		delivery: {
			type: orderInfo.delivery.type,
			address: orderInfo.delivery.address,
		},
		comments: orderInfo.comments,
		status: OrderStatuses.Created,
		total: 0,
	}
	return newOrder;
}
