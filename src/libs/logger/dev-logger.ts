import { createLogger, format, transports } from "winston";

const { timestamp, combine, printf, colorize, errors } = format;

function buildDevLogger() {
  const logFormat = printf(
    ({ level, message, timestamp, stack }) =>
      `${timestamp} ${level}: ${stack || message}`
  );

  return createLogger({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}

export default buildDevLogger;
