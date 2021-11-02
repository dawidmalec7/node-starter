import AuthService from "service/auth";
import { HTTP } from "types/http";
interface AuthControllerDependencies {
  authService: AuthService;
}
class AuthController {
  public authService: AuthControllerDependencies["authService"];

  constructor({ authService }: AuthControllerDependencies) {
    this.authService = authService;
  }
  public login = async (
    req: HTTP.REQUEST,
    res: HTTP.RESPONSE,
    next: HTTP.NEXT
  ) => {
    try {
      const tokens = await this.authService.login();
      res.status(201).json(tokens);
    } catch (err) {
      next(err);
    }
  };

  public register = async (
    req: HTTP.REQUEST,
    res: HTTP.RESPONSE,
    next: HTTP.NEXT
  ) => {
    try {
      const tokens = await this.authService.register();
      res.status(201).json(tokens);
    } catch (err) {
      next(err);
    }
  };

  public verify = async (
    req: HTTP.REQUEST,
    res: HTTP.RESPONSE,
    next: HTTP.NEXT
  ) => {
    try {
      const tokens = await this.authService.authenticateToken(next);
      res.status(201).json(tokens);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
