import { orderDB } from "../db/db";
import { IPopulatedCartItem } from "../scheme/CartScheme";

type ORDER_STATUS = 'created' | 'completed';

interface IPopulatedOrder {
	id: string,
	userId: string;
	cartId: string;
	items: IPopulatedCartItem[]
	payment: {
		type: string,
		address?: unknown,
		creditCard?: unknown,
	},
	delivery: {
		type: string,
		address: unknown,
	},
	comments: string,
	status: ORDER_STATUS;
	total: number;
}

export const pushOrder = async (order: IPopulatedOrder): Promise<number> => {
	await orderDB.push(order);
	return orderDB.length - 1;
}

export const getOrderByIdx = async (idx: number): Promise<IPopulatedOrder> => {
	return await orderDB[idx];
}
