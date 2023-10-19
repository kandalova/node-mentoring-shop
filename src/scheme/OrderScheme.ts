import { ICartItem } from "./CartScheme";

type ORDER_STATUS = 'created' | 'completed';

export interface IOrder {
  id: string,
  userId: string;
  cartId: string;
  items: ICartItem[]
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

export interface IPayment {
  type: string,
  address?: unknown,
  creditCard?: unknown,
}

export interface IDelivery {
  type: string,
  address: unknown,
}


export type IOrderInfo = Pick<IOrder, "payment" | "delivery" | "comments">;

export enum OrderStatuses {
  Created = 'created',
  Complited = "completed"
}
