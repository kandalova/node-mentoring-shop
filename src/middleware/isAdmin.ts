import { NextFunction, Request, Response } from "express";
import { getAdminError } from "../utils/errors";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const currentUser = req.user;
	if (currentUser.role !== 'admin') {
		next(getAdminError());
	}
	else {
		next();
	}
}
