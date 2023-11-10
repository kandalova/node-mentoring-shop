import { Schema, Types, model } from "mongoose";
import { IResponse } from "./ServiceUtils";

export interface IProduct {
  _id: Types.ObjectId | number;
  title: string;
  description: string;
  price: number;
  product?: string;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  product: String,
}, { versionKey: false });

export const ProductModel = model<IProduct>("Product", productSchema);

export interface IProductResponse extends IResponse {
  data: IProduct,
}

export interface IProductsResponse extends IResponse {
  data: IProduct[],
}
