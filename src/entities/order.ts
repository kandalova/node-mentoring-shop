import { Entity, Enum, OneToOne, PrimaryKey, Property, Ref, Reference } from "@mikro-orm/core";
import { v4 } from "uuid";
import { IDelivery, IPayment, OrderStatuses } from "../scheme/OrderScheme";
import { Cart } from "./cart.ts";
import { Payment } from "./payment.ts";
import { Delivery } from "./delivery.ts";

@Entity()
export class Order {
	@PrimaryKey()
	id: string = v4();

	@OneToOne(() => Cart, cart => cart.order, { ref: true, owner: true })
	cart!: Ref<Cart>;

	@OneToOne(() => Payment, payment => payment.order, { ref: true, owner: true, nullable: true })
	payment!: Ref<Payment>;

	@OneToOne(() => Delivery, delivery => delivery.order, { ref: true, owner: true, nullable: true })
	delivery!: Ref<Delivery>;

	@Property()
	comments: string;

	@Enum(() => OrderStatuses)
	status: OrderStatus = OrderStatus.CREATED;

	@Property()
	total: number;

	// constructor(dto: { cartId: string, total: number, comments: string, payment: IPayment, delivery: IDelivery }) {
	constructor(dto: { cartId: string, total: number, comments: string, paymentId: string, deliveryId: string }) {
		// this.cart = ref(Cart, dto.cartId); //the same, also rel possible for case without <Ref>
		this.cart = Reference.createFromPK(Cart, dto.cartId);
		this.comments = dto.comments;
		this.total = dto.total;
		this.payment = Reference.createFromPK(Payment, dto.paymentId);
		this.delivery = Reference.createFromPK(Delivery, dto.deliveryId);
	}
}

export const enum OrderStatus {
	CREATED = 'created',
	COMPLETED = 'complited',
}
