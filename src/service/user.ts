import { ID } from "types/commons";
import User from "model/user";
import errorHandler from "libs/error-handler";
import RequestError from "error/request-error";
import UserRepository from "repository/user";
import { USER } from "types/user";
import { Request, Response } from "express";

interface UserServiceDependencies {
  userRepository: UserRepository;
  response: Response;
  request: Request;
}

interface userCreate {
  firstName: string;
  lastName: string;
  email: string;
}

class UserService {
  private userRepository: UserServiceDependencies["userRepository"];
  private response: UserServiceDependencies["response"];
  private request: UserServiceDependencies["request"];

  constructor({ userRepository, response, request }: UserServiceDependencies) {
    this.userRepository = userRepository;
    this.response = response;
    this.request = request;
  }

  public createUser = async (
    userBody: USER.CREATE_BODY = this.request.body
  ) => {
    try {
      return await this.userRepository.insert<USER.CREATE_BODY>(userBody);
    } catch (err) {
      throw errorHandler(err);
    }
  };

  public getUserById = async (id: ID = this.request.params?.id) => {
    try {
      const user = await this.userRepository.findById<ID>(id);

      if (!user) {
        throw new RequestError({
          status: 404,
          message: "User not found",
          data: {},
        });
      }

      return user;
    } catch (err) {
      throw errorHandler(err);
    }
  };

  // getUsers = () => userDAO.getUsers();

  // deleteUser = (id: ID) => userDAO.deleteUser(id);

  // updateUser = (id: ID, user: USER.ENTITY) => userDAO.updateUser(id, user);
}

export default UserService;
