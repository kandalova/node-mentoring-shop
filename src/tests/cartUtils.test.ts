import { IPopulatedCartItem } from "../scheme/CartScheme";
import { IProduct } from "../scheme/ProductScheme";
import { getTotalPrice } from "../utils/cartUtils";

const product1: IProduct = {
	_id: 1,
	title: 'prod1',
	description: 'prod1',
	price: 3
}

const product2: IProduct = {
	_id: 2,
	title: 'prod2',
	description: 'prod2',
	price: 2
}

const cartItems: IPopulatedCartItem[] = [
	{
		product: product1,
		count: 2,
	},
	{
		product: product2,
		count: 3,
	}
]


describe("Validate total price", () => {
	test("should return 15", () => {
		const totalPriceResponce = getTotalPrice(cartItems);
		expect(totalPriceResponce).toEqual(12);
	})
});
