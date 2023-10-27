import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Cart } from "./cart";

@Entity()
export class User {
	@PrimaryKey()
	id: string = v4();

	@OneToMany(() => Cart, cart => cart.user)
	carts: Collection<Cart> = new Collection<Cart>(this);

}
