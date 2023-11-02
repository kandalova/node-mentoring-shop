import { Schema, model } from "mongoose";

export interface IUser {
	name: string,
}

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
}, { versionKey: false })

export const UserModel = model<IUser>("User", userSchema);
