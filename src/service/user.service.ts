import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserModel } from "../scheme/UserScheme";
import { throwLoginUserError, throwRegisterError } from "../utils/errors";

const findUserOrFail = async (email: string) => {
	return UserModel.findOne({ email }).orFail(() => throwLoginUserError());
}

export const createUser = async (name: string, isAuthor: boolean, email: string, password: string) => {
	const oldUser = await UserModel.findOne({ email });
	if (oldUser) {
		throwRegisterError();
	}
	const encryptedPassword = await bcrypt.hash(password, 10);
	await UserModel.create({
		name,
		email: email.toLowerCase(),
		password: encryptedPassword,
		role: isAuthor ? "author" : "reader"
	});
}

export const loginUser = async (email: string, password: string) => {
	const user = await findUserOrFail(email);
	if (!isTheSameCrypt(password, user.password)) {
		throwLoginUserError()
	}
	const token = jwt.sign(
		{ user_id: user._id, email, role: user.role },
		process.env.TOKEN_KEY!,
		{ expiresIn: '2h' }
	);
	return { token };
}

const isTheSameCrypt = async (str1: string, str2: string) => {
	await bcrypt.compare(str1, str2)
}
