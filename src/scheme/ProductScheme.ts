import { IResponse } from "./ServiceUtils";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface IProductResponse extends IResponse {
  data: IProduct,
}

export interface IProductsResponse extends IResponse {
  data: IProduct[],
}
