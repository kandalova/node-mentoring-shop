import { IResponse, IResponseError } from '../scheme/ServiceUtils';

export const getResponseError = async (message: string): Promise<IResponseError> => {
	return {
		data: null,
		error: {
			message: message
		}
	}
}

export const getResponse = (): IResponse => {
	return {
		data: "",
		error: null
	}
}
