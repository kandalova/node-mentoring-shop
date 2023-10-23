import * as dotenv from 'dotenv'
dotenv.config()
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const options: Options<PostgreSqlDriver> = {
	entities: ['./build/entities'], // path to your JS entities (dist), relative to `baseDir`
	entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
	migrations: {
		path: './build/migrations', // path to the folder with migrations
		pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
	},
	type: 'postgresql',
	seeder: {
		path: './dist/seeders', // path to the folder with seeders
		pathTs: './src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
		defaultSeeder: 'UserProductSeeder', // default seeder class name
		glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
		emit: 'ts', // seeder generation mode
		fileName: (className: string) => className, // seeder file naming convention
	},
};

export default options;
