import winston from "winston";

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({
			format: "MMM-DD-YYYY HH:mm:ss",
		}),
		winston.format.prettyPrint()
	),
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/example.log' }),
		new winston.transports.Console(),
	],
});

export default logger;
