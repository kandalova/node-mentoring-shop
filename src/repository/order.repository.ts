import { orderDB } from "..";
import { IOrder } from "../scheme/OrderScheme";

export const pushOrder = async (order: IOrder): Promise<number> => {
	await orderDB.push(order);
	return orderDB.length - 1;
}

export const getOrderByIdx = async (idx: number): Promise<IOrder> => {
	return await orderDB[idx];
}
