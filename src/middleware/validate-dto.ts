import { NextFunction, Response, Request } from "express";
import RequestError from "model/request-error";

function validateDto(schema: any) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      console.log(err);
      next(RequestError.validation(err.message, err.value));
    }
  };
}
export default validateDto;
