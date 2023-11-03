import bcrypt from "bcryptjs";

import { UserModel } from "../scheme/UserScheme";
import { throwRegisterError } from "../utils/errors";

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
