import { createLogger, format, transports } from "winston";

const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "./logs/error.log",
        level: "error",
      }),
    ],
  });
}

export default buildProdLogger;
