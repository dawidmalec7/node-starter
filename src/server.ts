import express from "express";
import requestErrorHandling from "error/api-error-handler";
import { setupDb } from "db/db";
import { setupDIMiddleware } from "./di-setup";
import router from "routes";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.setup();
  }

  setup = () => {
    setupDb();
    this.app.use(express.json());
    this.app.use(setupDIMiddleware);
    this.app.use(router);
    this.app.use(requestErrorHandling);
  };

  run(port: number = 8080) {
    this.app.listen(port, () => console.log("Server listening on 8080"));
  }
}

export default Server;
