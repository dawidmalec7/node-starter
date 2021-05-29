import { Response, Request, NextFunction } from "express";
import { Session } from "express-session";

export namespace HTTP {
  export type RESPONSE = Response;
  export interface REQUEST extends Request {
    user: any;
  }
  export type NEXT = NextFunction;
  export interface SESSION extends Session {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }
}
