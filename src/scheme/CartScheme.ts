import { Schema, Types, model } from "mongoose";
import { IResponse } from "./ServiceUtils";
import { IProduct } from "./ProductScheme";

export interface ICart {
  id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

export interface ICartItem {
  product: IProduct,
  count: number,
}

export interface ICartItemSchema {
  product: Types.ObjectId,
  count: number,
}

export interface ICartSchema {
  user: Types.ObjectId;
  isDeleted: boolean;
  items: Types.DocumentArray<ICartItemSchema>;
}

const cartItemSchema = new Schema<ICartItemSchema>({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  count: { type: Number, required: true },
}, { versionKey: false });

const cartSchema = new Schema<ICartSchema>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
  items: [cartItemSchema],
}, { versionKey: false });

export const CartModel = model<ICartSchema>('Cart', cartSchema);

export interface ICartItemByID {
  productId: string,
  count: number,
}

export type OmitCart = Omit<ICart, 'userId' | 'isDeleted'>;

export enum CartEditableProperties {
  Items = 'items',
  IsDeleted = "isDeleted"
}

export interface ICartResponse extends IResponse {
  data: {
    cart: OmitCart,
    totalPrice: number,
  },
}

export interface IDeleteCartResponse extends IResponse {
  data: {
    success: boolean
  },
}
