import buildDevLogger from "./dev-logger";
import buildProdLogger from "./prod-logger";

const isProd = process.env.NODE_ENV === "production";

const logger = isProd ? buildProdLogger() : buildDevLogger();

export default logger;
