import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Order } from "./order";
import { Ref } from "@mikro-orm/core/entity";

@Entity()
export class Delivery {
	@PrimaryKey()
	id: string = v4();

	@Property()
	type: string;

	@Property()
	address: unknown;

	@OneToOne(() => Order, order => order.delivery, { orphanRemoval: true, ref: true })
	order!: Ref<Order>;

	constructor(dto: { type: string, address: unknown }) {
		this.type = dto.type;
		if (dto.address) {
			this.address = dto.address;
		}
	}

}
