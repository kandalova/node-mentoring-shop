import { Entity, Enum, OneToOne, PrimaryKey, Property, Ref, Reference } from "@mikro-orm/core";
import { v4 } from "uuid";
import { IDelivery, IPayment, OrderStatuses } from "../scheme/OrderScheme";
// import { User } from "./user.ts";
import { Cart } from "./cart.ts";
import { Payment } from "./payment.ts";
import { Delivery } from "./delivery.ts";

@Entity()
export class Order {
	@PrimaryKey()
	id: string = v4();

	@OneToOne(() => Cart, cart => cart.order, { ref: true, owner: true })
	cart!: Ref<Cart>;

	@OneToOne(() => Payment, payment => payment.order, { ref: true, owner: true })
	payment!: Ref<Payment>;

	@OneToOne(() => Delivery, delivery => delivery.order, { ref: true, owner: true })
	delivery!: Ref<Delivery>;


	@Property()
	comments: string;

	@Enum(() => OrderStatuses)
	status: OrderStatus = OrderStatus.CREATED;

	@Property()
	total: number;

	constructor(dto: { userId: string, cartId: string, comments: string, total: number, payment: IPayment, delivery: IDelivery }) {
		// this.user = Reference.createFromPK(User, dto.userId);
		this.cart = Reference.createFromPK(Cart, dto.cartId);
		// this.cart = ref(Cart, dto.cartId); //the same, also rel possible for case without <Ref>
		this.comments = dto.comments;
		this.total = dto.total;
		// this.payment = dto.payment;
		// this.delivery = dto.delivery;
	}
}

export const enum OrderStatus {
	CREATED,
	COMPLETED,
}
