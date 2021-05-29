import logger from "libs/logger";

class LoggerStream {
  write(text: string) {
    logger.info(text);
  }
}
export default LoggerStream;
