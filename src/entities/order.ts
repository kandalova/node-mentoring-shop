import { Entity, Enum, JsonType, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { IDelivery, IPayment, OrderStatuses } from "../scheme/OrderScheme";
import { Ref, Reference } from "@mikro-orm/core/entity";
import { User } from "./user.ts";
import { Cart } from "./cart.ts";

@Entity()
export class Order {
	@PrimaryKey()
	id: string = v4();

	@ManyToOne(() => User, { ref: true })
	user: Ref<User>

	@OneToOne(() => Cart, { ref: true, owner: true })
	cart: Ref<Cart>;

	@Property
	items: ICartItem[];

	@OneToOne(() => Payment, { ref: true })
	payment: Ref<Payment>;

	@Property({ type: JsonType })
	delivery: IDelivery;

	@Property()
	comments: string;

	@Enum(() => OrderStatuses)
	status: OrderStatus = OrderStatus.CREATED;

	@Property()
	total: number;

	constructor(userId: string, cartId: string, comments: string, total: number, payment: IPayment, delivery: IDelivery) {
		this.user = Reference.createFromPK(User, userId);
		this.cart = Reference.createFromPK(Cart, cartId);
		this.comments = comments;
		this.total = total;
		this.payment = payment;
		this.delivery = delivery;
	}
}

export const enum OrderStatus {
	CREATED,
	COMPLETED,
}
