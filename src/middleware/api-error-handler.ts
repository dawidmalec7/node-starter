import RequestError from "../model/request-error";
import { Response, Request, NextFunction } from "express";
import logger from "../libs/logger";

function requestErrorHandling(
  err: RequestError,
  _: Request,
  res: Response,
  next: NextFunction
) {
  //in prod dont use console cuz it is not async
  console.error(err);

  const status = err.status;
  let message = err.message;
  let data = err.data;

  if (status === 400) message = "Bad request";

  res.status(status).send({ message, data });
}

export default requestErrorHandling;
