import jwt from "jsonwebtoken";

class TokenService {
  constructor() {}

  public resolveAuthTokens = async (userId: string) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    return Promise.all([accessToken, refreshToken]);
  };

  public verify = async (token: string, type: "access" | "refresh") => {
    const secret =
      type === "access"
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET;

    return jwt.verify(token, secret);
  };
}

export default TokenService;
