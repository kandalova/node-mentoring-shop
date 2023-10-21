import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Cart } from "./cart";
import { Ref, Reference } from "@mikro-orm/core/entity";
import { Product } from "./product";

@Entity()
export class CartItem {
	@ManyToOne(() => Cart, { primary: true, ref: true })
	cart: Ref<Cart>

	@ManyToOne(() => Product, { primary: true, ref: true })
	product: Ref<Product>

	@Property()
	count: number;

	constructor(dto: { cartId: string, productId: string, count: number }) {
		this.count = dto.count;
		this.cart = Reference.createFromPK(Cart, dto.cartId);
		this.product = Reference.createFromPK(Product, dto.productId);
	}
}
