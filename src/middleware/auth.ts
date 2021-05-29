import RequestError from "model/request-error";
import TokenService from "service/token";
import { HTTP } from "types/http";

const authenticateToken = async (
  req: HTTP.REQUEST,
  res: HTTP.RESPONSE,
  next: HTTP.NEXT
) => {
  const reqAccessHeader = req.headers["authorization"];

  if (!reqAccessHeader)
    next(
      new RequestError({
        status: 401,
        message: "Unauthorized",
        data: {},
      })
    );

  const reqAccessToken = (reqAccessHeader as string).split(" ")[1];
  const tokenService = new TokenService();
  try {
    const user = await tokenService.verify(reqAccessToken, "access");
    req.user = user;
  } catch (err) {
    next(
      new RequestError({
        status: 401,
        message: "Unauthorized",
        data: {},
      })
    );
  }
  next();
};

export default authenticateToken;
