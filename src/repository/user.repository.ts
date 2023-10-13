import { userDB } from "../db/db";

export const findUser = async (userId: string) => {
	return await userDB.find((id) => id === userId);
}
