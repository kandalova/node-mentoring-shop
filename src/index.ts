// import * as dotenv from 'dotenv'
// dotenv.config()

import express, { NextFunction, Request, Response } from "express";
import http from 'http';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

import config from './config/orm.config'
import { findUser } from "./repository/user.repository.ts";
import cartRouter from "./controller/cart.controller.ts";
import productRouter from "./controller/product.controller.ts";
import { ResponseError, getForbidenError, getUnauthorizedError } from "./utils/errors.ts";
import { getResponseError } from "./utils/utils.ts";
import { Product } from "./entities/product.ts";


export const DI = {} as {
	server: http.Server;
	orm: MikroORM,
	em: EntityManager,
	productRepository: EntityRepository<Product>

}

export const app = express();
const PORT = 3000;

const headerHandler = async (req: Request, _: Response, next: NextFunction) => {
	const userId = req.header('x-user-id') ?? '';
	if (!userId) {
		next(getForbidenError());
	}
	const user = await findUser(userId);
	if (!user) {
		next(getUnauthorizedError());
	}
	next();
}

const errorHandler = async (err: Error | ResponseError, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof ResponseError) {
		res.status(err.status);
	}
	else {
		res.status(500);
	}
	res.send(await getResponseError(err.message));
}

export const init = (async () => {
	DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
	DI.em = DI.orm.em;
	DI.productRepository = DI.orm.em.getRepository(Product);

	app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
	app.use('/api/profile/cart', headerHandler, cartRouter, errorHandler);
	app.use('/api/products', headerHandler, productRouter, errorHandler);

	DI.server = app.listen(PORT, () => {
		console.log(`MikroORM express TS server is Fire at http://localhost:${PORT}`);
	});
})();
