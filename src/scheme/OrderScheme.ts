import { Schema, Types, model } from "mongoose";
import { IPopulatedCartItem } from "./CartScheme";

export interface IOrder {
  user: Types.ObjectId;
  cart: Types.ObjectId;
  items: IPopulatedCartItem[];
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
  status: OrderStatuses;
  total: number;
}

export enum OrderStatuses {
  Created = 'created',
  Complited = "completed"
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  items: {
    type: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      product: { type: String, required: true }
    }],
  },
  payment: {
    type: { type: String, required: true },
    address: Schema.Types.Mixed,
    creditCard: Schema.Types.Mixed,
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed, required: true },
  },
  comments: { type: String },
  status: { type: String, enum: Object.values(OrderStatuses), required: true, default: OrderStatuses.Created },
  total: { type: Number, required: true },
}, { versionKey: false });

export const OrderModel = model<IOrder>('Order', orderSchema);

export type IOrderInfo = Pick<IOrder, "payment" | "delivery" | "comments">;
