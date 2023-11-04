import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getAuthError, getTokenError } from "../utils/errors";

export interface CurrentUser {
	user_id: string
	email: string,
	role: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			next(getAuthError());
		}
		const [tokenType, token] = authHeader!.split(" ");
		if (tokenType !== "Bearer") {
			next(getTokenError(403));
		}
		const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
		req.user = user;
		next();
	}
	catch (err) {
		next(getTokenError());
	}
}

//obsolete
// const headerHandler = async (req: Request, _: Response, next: NextFunction) => {
// 	try {
// 		const userId = req.header('x-user-id') ?? '';
// 		if (!userId) {
// 			next(getForbidenError());
// 		}
// 		const user = await UserModel.findById(userId);
// 		if (!user) {
// 			next(getUnauthorizedError());
// 		}
// 		next();
// 	}
// 	catch (err) {
// 		next(err);
// 	}
// }
