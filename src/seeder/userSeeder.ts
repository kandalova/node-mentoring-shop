import { userDB } from "../db/db"
import { UserModel } from "../scheme/UserScheme";

export const runUserSeeder = async () => {
	userDB.forEach(async (value, i) => {
		const newUser = new UserModel({ name: `User-${i}` });
		await newUser.save();
	});
}
