import { connect, disconnect } from "mongoose";

export const connectDB = async () => {
	const { MONGO_URI } = process.env;

	if (!MONGO_URI) {
		console.log("Please provide DataBase URI to connect. exiting now...");
		process.exit(1);
	}

	try {
		await connect(MONGO_URI);
		console.log("Successfully connected to database");
	}
	catch (err) {
		console.log("DataBase connection failed. exiting now...");
		console.error(err);
		process.exit(1);
	}
}

export const disconnectDB = async () => {
	try {
		await disconnect();
		console.log("DataBase is disconnected");

	}
	catch (err) {
		console.log(err);
	}
}
