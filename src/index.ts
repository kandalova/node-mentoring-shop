import { createWriteStream } from "fs";
import path from "path";
import express from "express";
import { config } from "dotenv";
import { Socket } from "net";
import morgan from "morgan";
import { connectDB, disconnectDB, isConnected } from "./config/database.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import userRouter from "./controller/user.controller.ts";
import { verifyToken } from "./middleware/auth.ts";
import { errorHandler } from "./middleware/error.ts";
import logger from "./config/logger.ts";
import { debuglogger } from "./config/debugger.ts";

//for seeders
// import { ProductModel } from "./scheme/ProductScheme.ts";
// import { runProductSeeder } from "./seeder/productSeeder.ts";



const ROOT_DIR = path.resolve(__dirname, '..');

export const init = (async () => {
	try {
		config();
		const { API_PORT } = process.env;
		const PORT = API_PORT || 3000;

		const requestLogStream = createWriteStream(path.join(ROOT_DIR, '/logs/request.log'), { flags: 'a' })

		await connectDB();
		const app = express();
		let connections: Socket[] = [];

		app.use(morgan(':method :url :response-time [:date]', { stream: requestLogStream }))
		app.get('/health', (_, res) => {
			if (!isConnected()) {
				res.status(500).json({
					message: 'Not connected to database'
				});
			}
			res.status(200).json({
				message: 'Application is healthy'
			});
		});
		app.use('/api', verifyToken);
		app.use('/api/profile/cart', cartRouter);
		app.use('/api/products', productRouter);
		app.use('/user', userRouter);
		app.use(errorHandler);

		const server = app.listen(PORT, () => {
			debuglogger(`Server is Fire at ${PORT}`);
			logger.info(`Server is Fire at ${PORT}`);
		});

		server.on('connection', (connection) => {
			connections.push(connection);
			connection.on('close', () => {
				connections = connections.filter((currentConnection) => currentConnection !== connection);
			});
		});

		const shutdown = async () => {
			debuglogger('Received kill signal, shutting down gracefully');

			server.close(async () => {
				debuglogger('Closed out remaining connections');
				await disconnectDB();
				process.exit(0);
			});

			setTimeout(async () => {
				logger.error('Could not close connections in time, forcefully shutting down');
				await disconnectDB();
				process.exit(1);
			}, 20000);

			connections.forEach((connection) => connection.end());

			setTimeout(() => {
				connections.forEach((connection) => connection.destroy());
			}, 10000);
		}

		process.on('SIGTERM', shutdown);
		process.on('SIGINT', shutdown);

		//mock product data for first run
		// const product = await ProductModel.findOne();
		// if (!product) {
		// 	await runProductSeeder();
		// }
	}
	catch (err) {
		logger.error(err);
	}
})();
