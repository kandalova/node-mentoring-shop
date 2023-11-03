import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { createUser } from "../service/user.service";
import { getPutSchemeError } from "../utils/errors";

const registerSchema = Joi.object({
	name: Joi.string().required(),
	isAuthor: Joi.boolean().required(),
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

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post("/register", registerValidator, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, isAuthor, email, password } = req.body;
		await createUser(name, isAuthor, email, password);
		res.status(201).send('User successfully registered');
	}
	catch (err) {
		next(err);
	}
});


export default userRouter;
