import { cartDB } from "..";
import { CartEditableProperties, ICart, ICartItem } from "../scheme/CartScheme";

export const pushCart = async (cart:ICart)=>{
	await cartDB.push(cart);
}

export const findUserCart = async (userId: string):Promise<ICart>=>{
	const cart = await cartDB.find((cart) => cart.userId === userId && !cart.isDeleted);
	return cart;
}

export const findUserCartIdx = async (userId: string)=>{
	const index = await cartDB.findIndex((cart) => cart.userId === userId && !cart.isDeleted);
	return index;
}


export const findUserCartIdxByID =  async(userId: string, cartId:string)=>{
	const index = await cartDB.findIndex((cart) => cart.userId === userId && cart.id === cartId && !cart.isDeleted);
	return index;
}

export const updateCartProperty =  async(cartIdx:number, property:CartEditableProperties, value:boolean|ICartItem[])=>{
	cartDB[cartIdx][property] = value;
}

export const getCartByIdx =async (cartIdx:number):Promise<ICart> => {
	return await cartDB[cartIdx];
}
