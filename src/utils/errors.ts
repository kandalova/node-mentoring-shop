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

export const throwNoCartExists = (id: string) => {
	throw new ResponseError(`No cart for user ${id}`, 400);
}

export const throwNoProductExists = () => {
	throw new ResponseError(`No product for user`, 400);
}

export const throwEmptyCart = (id: string) => {
	throw new Error(`Cart for user ${id} is empty`);
}

export const getUnauthorizedError = (status = 401) => {
	return getResposeError(`Header x-user-id is missing or no user with such id`, status)
}

export const getPutSchemeError = (status = 400) => {
	return getResposeError(`Bad request body`, status)
}

export const throwRegisterError = (status = 409) => {
	throw getResposeError(`User Already Exist. Please Login`, status)
}

export const throwLoginUserError = (status = 400) => {
	throw getResposeError(`Invalid Credentials`, status)
}

export const getAuthError = (status = 401) => {
	return getResposeError(`Token is required`, status);
}

export const getTokenError = (status = 401) => {
	return getResposeError(`Invalid Token`, status);
}

export const getAdminError = (status = 403) => {
	return getResposeError(`Forbidden`, status);
}
