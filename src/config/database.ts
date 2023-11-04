import { connect, disconnect } from "mongoose";

export const connectDB = async () => {
	const { MONGO_URI } = process.env;
	console.log(MONGO_URI)

	if (!MONGO_URI) {
		console.log("Please provide DataBase URI to connect. exiting now...");
		process.exit(1);
	}

	try {
		await connect(MONGO_URI);
		console.log("Successfully connected to database");

		// listen (ctrl-c)
		process.on("SIGINT", async () => {
			await disconnect();
			console.log("DataBase is disconnected");
			process.exit();
		});

	}
	catch (err) {
		console.log("DataBase connection failed. exiting now...");
		console.error(err);
		process.exit(1);
	}
}
