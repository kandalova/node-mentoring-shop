import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { User } from "./user.ts";
import { Ref, Reference } from "@mikro-orm/core/entity";
import { Order } from "./order.ts";
import { ICartItem } from "../scheme/CartScheme.ts";

@Entity()
export class Cart {
	@PrimaryKey()
	id: string = v4();

	@Property()
	isDeleted: boolean = false;

	@ManyToOne(() => User, { ref: true })
	user: Ref<User>

	@Property()
	items: ICartItem[];
	
	@OneToOne(() => Order, order => order.id, { orphanRemoval: true })
  order!: Order;

	constructor(userId: string) {
		this.user = Reference.createFromPK(User, userId);
	}
}
