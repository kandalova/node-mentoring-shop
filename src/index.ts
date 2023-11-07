import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB, isConnected } from "./config/database.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import userRouter from "./controller/user.controller.ts";
import { verifyToken } from "./middleware/auth.ts";
import { errorHandler } from "./middleware/error.ts";
import { Socket } from "net";

//for seeders
// import { ProductModel } from "./scheme/ProductScheme.ts";
// import { runProductSeeder } from "./seeder/productSeeder.ts";

export const init = (async () => {
	try {
		config();
		const { API_PORT, API_HOST } = process.env;
		const PORT = API_PORT || 3000;
		const HOST = API_HOST;

		await connectDB();
		const app = express();
		let connections: Socket[] = [];

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


		const server = app.listen(PORT, HOST, () => {
			console.log(`Server is Fire at ${HOST}:${PORT}`);
		});

		server.on('connection', (connection) => {
			connections.push(connection);
			connection.on('close', () => {
				connections = connections.filter((currentConnection) => currentConnection !== connection);
			});
		});

		const shutdown = async () => {
			console.log('Received kill signal, shutting down gracefully');

			server.close(async () => {
				console.log('Closed out remaining connections');
				await disconnectDB();
				process.exit(0);
			});

			setTimeout(async () => {
				console.error('Could not close connections in time, forcefully shutting down');
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
		console.log(err);
	}
})();
