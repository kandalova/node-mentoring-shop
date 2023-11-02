import { Schema, Types, model } from "mongoose";
import { IResponse } from "./ServiceUtils";
import { IProduct } from "./ProductScheme";

export interface ICart {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  isDeleted: boolean;
  items: Types.DocumentArray<ICartItem>;
}

export type PopulatedCart = Omit<ICart, 'items'> & {
  items: IPopulatedCartItem[];
};

export interface ICartItem {
  product: Types.ObjectId,
  count: number,
}

export interface ICartItemByID {
  productId: string,
  count: number,
}

export interface IPopulatedCartItem {
  product: IProduct,
  count: number,
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  count: { type: Number, required: true },
}, { versionKey: false });

const cartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
  isDeleted: { type: Boolean, default: false, required: true },
  items: [cartItemSchema],
}, { versionKey: false });

export const CartModel = model<ICart>('Cart', cartSchema);

export type OmitCart = Pick<PopulatedCart | ICart, '_id' | 'items'>;

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
