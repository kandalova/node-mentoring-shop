import { IProduct } from "./ProductScheme";
import { IResponse } from "./ServiceUtils";

export interface ICart{
	id: string; // uuid
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

export interface ICartItem{
	product: IProduct,
  count: number,
}

export type OmitCart =  Omit<ICart, 'userId' | 'isDeleted'>;

export enum CartEditableProperties {
  Items = 'items',
  IsDeleted = "isDeleted"
}

export interface ICartResponse extends IResponse{
	data: {
    cart: OmitCart,
    totalPrice: number,
  }, 
}

export interface IDeleteCartResponse extends IResponse{
	data: {
    success: boolean
  }, 
}
