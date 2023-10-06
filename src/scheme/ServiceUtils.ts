export interface IResponseError{
	data:null,
	error: {
    message: string
  },
}

export interface IResponse{
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data:any,
	error: null,
}
