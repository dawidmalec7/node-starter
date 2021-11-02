import UserService from "service/user";
import { HTTP } from "types/http";
interface UserControllerDependencies {
  userService: UserService;
}
class UserController {
  public userService: UserControllerDependencies["userService"];

  constructor({ userService }: UserControllerDependencies) {
    this.userService = userService;
  }

  public getUser = async (
    req: HTTP.REQUEST,
    res: HTTP.RESPONSE,
    next: HTTP.NEXT
  ) => {
    try {
      const user = await this.userService.getUserById();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  async getUsers(_: HTTP.REQUEST, res: HTTP.RESPONSE, next: HTTP.NEXT) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: HTTP.REQUEST, res: HTTP.RESPONSE, next: HTTP.NEXT) {
    try {
      await this.userService.deleteUser();
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  // async updateUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await userService.updateUser(
  //       Number(req.params.id),
  //       req.body
  //     );
  //     res.status(200).json(result);
  //   } catch (err) {
  //     console.log(err);
  //     next(RequestError.badRequest(err.detail));
  //   }
  // }
}

export default UserController;
