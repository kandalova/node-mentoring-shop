import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createUser, loginUser } from "../service/user.service";
import { getPutSchemeError } from "../utils/errors";

const registerSchema = Joi.object({
	name: Joi.string().required(),
	isAdmin: Joi.boolean().required(),
	email: Joi.string().email().required(),
	password: Joi.string().length(10).required(),
})

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().length(10).required(),
})

const registerValidator = async (req: Request, _: Response, next: NextFunction) => {
	try {
		await registerSchema.validateAsync(req.body);
		next();
	}
	catch (err) {
		next(getPutSchemeError());
	}
}

const loginValidator = async (req: Request, _: Response, next: NextFunction) => {
	try {
		await loginSchema.validateAsync(req.body);
		next();
	}
	catch (err) {
		next(getPutSchemeError());
	}
}

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/register", registerValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, isAdmin, email, password } = req.body;
		await createUser(name, isAdmin, email, password);
		res.status(201).send('User successfully registered');
	}
	catch (err) {
		next(err);
	}
});

userRouter.post("/login", loginValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const token = await loginUser(email, password);
		res.send(token)
	}
	catch (err) {
		next(err);
	}
});


export default userRouter;
