import jwt from "jsonwebtoken";

class TokenService {
  constructor() {}

  public resolveAuthTokens = async (userId: string) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
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
