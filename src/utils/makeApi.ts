import { NextFunction, Response } from "express";

function makeApi(Controller: any): any {
  return function (methodName: string) {
    return function (req: any, res: Response, next: NextFunction) {
      const controller = new Controller(req.container.cradle);
      return controller[methodName](req, res, next);
    };
  };
}

export default makeApi;
