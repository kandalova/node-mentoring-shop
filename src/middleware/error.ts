import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../utils/errors";
import { getResponseError } from "../utils/utils";

export const errorHandler = async (err: Error | ResponseError, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof ResponseError) {
		res.status(err.status);
	}
	else {
		res.status(500);
	}
	res.send(await getResponseError(err.message));
}
