import express from "express";
import cors from "loaders/cors";
import morgan from "morgan";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import config from "config";
import requestErrorHandling from "middleware/api-error-handler";
import { setupDb } from "db/db";
import { setupDIMiddleware } from "./di-setup";
import router from "routes";
import LoggerStream from "libs/logger/logger-stream";

class Server {
  private app;
  private port;
  private redisStore;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.redisStore = connectRedis(session);
    this.setup();
  }

  setup = () => {
    const loggerStream = new LoggerStream();
    const redisClient = redis.createClient();

    setupDb();

    redisClient.on("connect", function () {
      console.log("Redis plugged in.");
    });

    //if I will run a proxy (e.g nginx)
    // this.app.set('trust proxy', 1);s

    this.app.use(
      session({
        store: new this.redisStore({ client: redisClient }),
        secret: "mySecret",
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: false, // in prod use true to transmit cookies by https
          httpOnly: true,
          maxAge: 1000 * 60 * 30,
        },
      })
    );

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
