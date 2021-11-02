import { TokenExpiredError } from "jsonwebtoken";
import { createAccessTokenCookie } from "libs/cookies";
import RequestError from "model/request-error";
import User from "model/user";
import UserRepository from "repository/user";
import AuthService from "service/auth";
import TokenService from "service/token";
import { HTTP } from "types/http";

const authenticateToken = async (
  req: HTTP.REQUEST,
  res: HTTP.RESPONSE,
  next: HTTP.NEXT
) => {
  const authService = new AuthService({
    tokenService: new TokenService(),
    userRepository: new UserRepository({ user: User }),
    response: res,
    request: req,
    session: req.session as HTTP.SESSION,
  });

  try {
    await authService.authenticateToken(next);
  } catch (err) {
    next(err);
  }
};

export default authenticateToken;
