import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Order } from "./order";
import { Ref } from "@mikro-orm/core/entity";

@Entity()
export class Payment {
	@PrimaryKey()
	id: string = v4();

	@Property()
	type: string;

	@Property({ nullable: true })
	address!: unknown;

	@Property({ nullable: true })
	creditCard!: unknown;

	@OneToOne(() => Order, order => order.payment, { orphanRemoval: true, ref: true })
	order!: Ref<Order>;

	constructor(dto: { type: string, address: unknown, creditCard: unknown }) {
		this.type = dto.type;
		if (dto.address) {
			this.address = dto.address;
		}
		if (dto.creditCard) {
			this.creditCard = dto.creditCard;
		}
	}

}
