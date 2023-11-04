import { Schema, model } from "mongoose";

export interface IUser {
	name: string,
	email: string,
	password: string,
	role: string
}

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
}, { versionKey: false })

export const UserModel = model<IUser>("User", userSchema);
