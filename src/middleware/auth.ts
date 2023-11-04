import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../scheme/UserScheme";
import { getAuthError, getTokenError, getUnauthorizedError } from "../utils/errors";

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
		else {
			const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
			req.user = user;
			next();
		}
	}
	catch (err) {
		next(getTokenError());
	}
}

export const userHeaderHandler = async (req: Request, _: Response, next: NextFunction) => {
	try {
		const userId = req.header('x-user-id') ?? '';
		if (!userId) {
			next(getUnauthorizedError());
		}
		const user = await UserModel.findById(userId);
		if (!user) {
			next(getUnauthorizedError());
		}
		next();
	}
	catch (err) {
		next(err);
	}
}
