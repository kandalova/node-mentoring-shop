import { CurrentUser } from "./middleware/auth";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_PORT: number;
			API_HOST: string;
		}
	}

	namespace Express {
		interface Request {
			user: CurrentUser
		}
	}
}
