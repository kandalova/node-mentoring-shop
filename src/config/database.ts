import mongoose, { STATES, connect, disconnect } from "mongoose";
import logger from "./logger";
import { debuglogger } from "./debugger";

export const connectDB = async () => {
	try {
		const { MONGO_URI } = process.env;

		if (!MONGO_URI) {
			//logger doean't work
			logger.error('An error occurred, exiting now', { metadata: 'No DataBase URI to connect' });
			process.exit(1);
		}
		await connect(MONGO_URI);
		debuglogger("Successfully connected to database");
	}
	catch (err) {
		logger.error('An error occurred while DB connecting, exiting now', { metadata: err });
		process.exit(1);
	}
}

export const disconnectDB = async () => {
	try {
		await disconnect();
		debuglogger("DataBase is disconnected");
	}
	catch (err) {
		logger.error('An error occurred while DB disconnecting', { metadata: err });
	}
}

export const isConnected = () => {
	const state = STATES[mongoose.connection.readyState];
	return state === 'connected';
}
