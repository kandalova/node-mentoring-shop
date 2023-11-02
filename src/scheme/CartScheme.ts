import { Schema, Types, model } from "mongoose";
import { IResponse } from "./ServiceUtils";
import { IProduct } from "./ProductScheme";
import { Document } from "mongoose";

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
  _id: Types.ObjectId;
  user: Types.ObjectId;
  isDeleted: boolean;
  items: Types.DocumentArray<ICartItemSchema>;
}

const cartItemSchema = new Schema<ICartItemSchema>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true },
}, { versionKey: false });

const cartSchema = new Schema<ICartSchema>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  isDeleted: { type: Boolean, default: false, required: true },
  items: [cartItemSchema],
}, { versionKey: false });

export const CartModel = model<ICartSchema>('Cart', cartSchema);

export type PopulatedCart = Omit<Document & ICartSchema, 'items'> & {
  items: ICartItem[];
};

export interface ICartItemByID {
  productId: string,
  count: number,
}

export type OmitCart = Pick<PopulatedCart | ICartSchema, '_id' | 'items'>;

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
