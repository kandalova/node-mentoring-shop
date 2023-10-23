import { Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Collection, Ref, Reference } from "@mikro-orm/core";
import { v4 } from "uuid";
import { User } from "./user.ts";
import { Product } from "./product.ts";
import { CartItem } from "./cartItem.ts";
import { Order } from "./order.ts";

@Entity()
export class Cart {
	@PrimaryKey()
	id: string = v4();

	@Property()
	isDeleted: boolean = false;

	@ManyToOne(() => User, { ref: true })
	user: Ref<User>

	@ManyToMany(() => Product, 'carts', { owner: true, pivotEntity: () => CartItem })
	products = new Collection<Product>(this);

	@OneToMany(() => CartItem, cartItem => cartItem.cart, { orphanRemoval: true })
	cartItems: Collection<CartItem> = new Collection<CartItem>(this);

	@OneToOne(() => Order, order => order.cart, { ref: true })
	order!: Ref<Order>;

	constructor(userId: string) {
		this.user = Reference.createFromPK(User, userId);
	}
}
