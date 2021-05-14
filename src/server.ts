import express from "express";
import cors from "config/cors";
import morgan from "morgan";
import requestErrorHandling from "error/api-error-handler";
import { setupDb } from "db/db";
import { setupDIMiddleware } from "./di-setup";
import router from "routes";
import LoggerStream from "logger/logger-stream";
import dotenv from "dotenv";
dotenv.config();
class Server {
  private app;
  private port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.setup();
  }

  setup = () => {
    const loggerStream = new LoggerStream();

    setupDb();

    this.app.use(morgan("combined", { stream: loggerStream }));
    this.app.options("*", cors);
    this.app.use(cors);
    this.app.use(express.json());
    this.app.use(setupDIMiddleware);
    this.app.use(router);
    this.app.use(requestErrorHandling);
  };

  run() {
    this.app.listen(this.port, () =>
      console.log(`Server listening on ${this.port}`)
    );
  }
}

export default Server;
