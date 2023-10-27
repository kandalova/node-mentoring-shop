import { Cart } from "../entities/cart";
import { Order } from "../entities/order";
import { ICart, IDeleteCartResponse, OmitCart } from "../scheme/CartScheme";
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

export const getTotalPrice = (cart: Cart): number => {
	let totalPrice: number = 0;
	cart.cartItems.map((item) => {
		const price = item.product.getProperty("price");
		totalPrice += price * item.count;
	});
	return totalPrice;
}

export const getOmitCartItems = (cart: Cart) => {
	return cart.cartItems.map((item) => ({ product: item.product.id, count: item.count }));
}

export const getOmitOrderItems = (cart: Cart) => {
	return cart.cartItems.map((item) => ({ product: item.product, count: item.count }));
}

export const getCartResponse = (cart: Cart) => {
	const totalPrice = getTotalPrice(cart);
	const omitItems = getOmitCartItems(cart);
	const response = {
		data: {
			cart: { id: cart.id, items: omitItems },
			totalPrice: totalPrice
		},
		error: null,
	}
	return response;
}

export const getOrderResponse = async (order: Order) => {
	const cart = order.cart.getEntity();
	await order.delivery.load();
	await order.payment.load();
	const omitItems = getOmitOrderItems(cart);
	const response = {
		data: {
			id: order.id,
			status: order.status,
			comments: order.comments,
			total: order.total,
			cart: { id: cart.id, items: omitItems },
			payment: {
				type: order.payment.getProperty('type'),
				address: order.payment.getProperty('address'),
				creditCard: order.payment.getProperty('creditCard'),
			},
			delivery: {
				address: order.delivery.getProperty('address'),
				type: order.delivery.getProperty('type'),
			}
		},
		error: null,
	}
	return response;
}

export const getOrderDto = async (cart: Cart, { comments, payment, delivery }: IOrderInfo) => {
	const total = getTotalPrice(cart);
	return {
		cartId: cart.id,
		comments: comments,
		payment: payment,
		delivery: delivery,
		total: total
	};
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
