import winston from "winston";

// Configure Winston logger
export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "debug",
      filename: "src/v1/logs/debug.log",
    }),
  ],
  format: winston.format.combine(
    // winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.errors({ stack: true })
  ),
});
