import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Cart } from "./cart";
import { CartItem } from "./cartItem";

@Entity()
export class Product {
	@PrimaryKey()
	id: string = v4();

	@Property()
	title: string;

	@Property()
	description: string;

	@Property()
	price: number;

	@ManyToMany(() => Cart, "products", { pivotEntity: () => CartItem })
	carts = new Collection<Cart>(this)

	constructor(title: string, description: string, price: number) {
		this.title = title;
		this.description = description;
		this.price = price;
	}
}
