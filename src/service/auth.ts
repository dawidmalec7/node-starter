import { ID } from "types/commons";
import errorHandler from "libs/error-handler";
import RequestError from "model/request-error";
import UserRepository from "repository/user";
import User from "model/user";
import { AUTH } from "types/auth";
import TokenService from "./token";
import { createAccessTokenCookie } from "libs/cookies";
import { HTTP } from "types/http";
import { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface AuthServiceDependencies {
  userRepository: UserRepository;
  tokenService: TokenService;
  session: HTTP.SESSION;
  response: HTTP.RESPONSE;
  request: HTTP.REQUEST;
}

class AuthService {
  private userRepository: AuthServiceDependencies["userRepository"];
  private tokenService: AuthServiceDependencies["tokenService"];
  private response: AuthServiceDependencies["response"];
  private request: AuthServiceDependencies["request"];
  private session: AuthServiceDependencies["session"];

  constructor({
    tokenService,
    userRepository,
    response,
    request,
    session,
  }: AuthServiceDependencies) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.response = response;
    this.request = request;
    this.session = session;
  }

  public register = async (
    credentials: AUTH.SIGN_UP_CREDENTIALS = this.request.body
  ) => {
    let user;

    try {
      const hashedPassword: string = await bcrypt.hash(
        credentials.password,
        10
      );
      user = await this.userRepository.create<AUTH.SIGN_UP_CREDENTIALS>({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        phone: credentials.phone,
        password: hashedPassword,
        email: credentials.email,
      });
    } catch (err) {
      if (err.constraint === "users_email_unique") {
        throw new RequestError({
          status: 422,
          message: "Login is reserved",
          data: { email: credentials.email },
        });
      }
      throw errorHandler(err);
    }

    try {
      const [
        accessToken,
        refreshToken,
      ] = await this.tokenService.resolveAuthTokens(user.id);

      const { name, value, options } = createAccessTokenCookie(accessToken);
      this.response.cookie(name, value, options);

      this.session.accessToken = accessToken;
      this.session.refreshToken = refreshToken;
      this.session.userId = user.id;

      return { accessToken, refreshToken };
    } catch (err) {
      throw errorHandler(err);
    }
  };

  public login = async (
    credentials: AUTH.SIGN_IN_CREDENTIALS = this.request.body
  ) => {
    const login = credentials.login;
    const password = credentials.password;

    if (!login || !password) {
      throw new RequestError({
        status: 401,
        message: "Provide email and password",
        data: {},
      });
    }

    let user: User;

    try {
      user = await this.userRepository.findOne("email", login);
    } catch (err) {
      throw errorHandler(err);
    }

    const passwordCheckedResult = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!passwordCheckedResult) {
      throw new RequestError({
        message: "Incorrect password",
        status: 401,
        data: {},
      });
    }

    try {
      const [
        accessToken,
        refreshToken,
      ] = await this.tokenService.resolveAuthTokens(user.id);

      const { name, value, options } = createAccessTokenCookie(accessToken);
      this.response.cookie(name, value, options);

      this.session.accessToken = accessToken;
      this.session.refreshToken = refreshToken;
      this.session.userId = user.id;

      return { accessToken, refreshToken };
    } catch (err) {
      throw errorHandler(err);
    }
  };

  authenticateToken = async (next: HTTP.NEXT) => {
    const reqAccessHeader = this.request.headers["authorization"];

    if (!reqAccessHeader)
      throw new RequestError({
        status: 401,
        message: "Unauthorized",
        data: {},
      });

    const reqAccessToken = (reqAccessHeader as string).split(" ")[1];

    try {
      await this.tokenService.verify(reqAccessToken, "access");
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        try {
          await this.tokenService.verify(this.session.refreshToken, "refresh");
        } catch (err) {
          this.session.accessToken = null;
          this.session.refreshToken = null;
          throw new RequestError({
            status: 401,
            message: "Unauthorized",
            data: {},
          });
        }

        const [accessToken] = await this.tokenService.resolveAuthTokens(
          this.session.userId
        );

        const { name, value, options } = createAccessTokenCookie(accessToken);
        this.response.cookie(name, value, options);
        this.session.accessToken = accessToken;
      } else {
        throw new RequestError({
          status: 401,
          message: "Unauthorized",
          data: {},
        });
      }
    }
    next();
  };
}

export default AuthService;
