import { Types } from "mongoose";
import { ICart, ICartItem, ICartItemSchema, ICartResponse, ICartSchema, IDeleteCartResponse, OmitCart, PopulatedCart } from "../scheme/CartScheme";
import { IOrderInfo, IOrder, OrderStatuses } from "../scheme/OrderScheme";
import { IProduct } from "../scheme/ProductScheme";
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

export const getOmitCart = ({ _id, items }: PopulatedCart | ICartSchema): OmitCart => {
	return { _id, items };
}

export const getTotalPrice = (items: ICartItem[] | ICartItemSchema[]): number => {
	let totalPrice = 0;
	items.map((item) => {
		const price = item.product.price;
		totalPrice += price * item.count;
	});
	return totalPrice;
}

export const getCartResponse = (cart: PopulatedCart | ICartSchema): ICartResponse => {
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

export const generateOrderDTO = (cart: PopulatedCart, orderInfo: IOrderInfo) => {
	const newOrderDTO = {
		user: cart.user,
		cart: cart._id,
		items: cart.items.map(item => ({
			product: item.product._id.toString(),
			title: item.product.title,
			description: item.product.description,
			price: item.product.price,
		})),
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
		total: 0,
	}
	newOrderDTO.total = getTotalPrice(cart.items);
	return newOrderDTO;
}
