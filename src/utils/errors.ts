export class ResponseError extends Error implements IResponseError {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

interface IResponseError extends Error {
	status: number;
}

const getResposeError = (message: string, status: number): ResponseError => {
	const err = new ResponseError(message, status);
	return err;
}

export const throwNoUser = (id: string) => {
	throw new Error(`No user ${id}`);
}

export const throwCartExistsError = (id: string): ResponseError => {
	throw new ResponseError(`Cart for user ${id} already exists`, 400);
}

export const throwNoCartExistsById = (id: string, cartId: string) => {
	throw new Error(`No cart ${cartId} for user ${id}`);
}

export const throwNoCartExists = (id: string) => {
	throw new ResponseError(`No cart for user ${id}`, 400);
}

export const getNoCartExists = (id: string): ResponseError => {
	return new ResponseError(`No cart for user ${id}`, 400);
}

export const throwNoProductExists = () => {
	throw new ResponseError(`No product for user`, 400);
}

export const throwEmptyCart = (id: string) => {
	throw new Error(`Cart for user ${id} is empty`);
}

export const throwUnauthorized = (status = 401) => {
	throw getResposeError(`Header x-user-id is missing or no user with such id`, status)
}

export const getUnauthorizedError = (status = 401) => {
	return getResposeError(`Header x-user-id is missing or no user with such id`, status)
}

export const getForbidenError = (status = 403) => {
	return getResposeError(`You must be authorized user`, status)
}

export const getPutSchemeError = (status = 400) => {
	return getResposeError(`Bad request body`, status)
}
