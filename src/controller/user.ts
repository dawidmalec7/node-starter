import { NextFunction, Response, Request } from "express";
import UserService from "service/user";
import RequestError from "error/request-error";

interface UserControllerDependencies {
  userService: UserService;
}
class UserController {
  public userService: UserControllerDependencies["userService"];

  constructor({ userService }: UserControllerDependencies) {
    this.userService = userService;
  }
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser();

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById();

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  // async getUsers(_: Request, res: Response, next: NextFunction) {
  //   try {
  //     const users = await userService.getUsers();
  //     res.status(200).json(users);
  //   } catch (err) {
  //     console.log(err);
  //     next(RequestError.badRequest(err.detail));
  //   }
  // }

  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await userService.deleteUser(Number(req.query.id));
  //     const isSuccess = result === 1;

  //     isSuccess
  //       ? res.status(200).json("")
  //       : new RequestError(422, "User doesn't exist");
  //   } catch (err) {
  //     console.log(err);
  //     next(RequestError.badRequest(err.detail));
  //   }
  // }

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
