import { ID } from "types/commons";
import errorHandler from "libs/error-handler";
import RequestError from "model/request-error";
import UserRepository from "repository/user";
import { USER } from "types/user";
import { HTTP } from "types/http";

interface UserServiceDependencies {
  userRepository: UserRepository;
  response: HTTP.RESPONSE;
  request: HTTP.REQUEST;
  session: HTTP.SESSION;
}

class UserService {
  private userRepository: UserServiceDependencies["userRepository"];
  private response: UserServiceDependencies["response"];
  private request: UserServiceDependencies["request"];
  private readonly session: UserServiceDependencies["session"];

  constructor({
    userRepository,
    response,
    request,
    session,
  }: UserServiceDependencies) {
    this.userRepository = userRepository;
    this.response = response;
    this.request = request;
    this.session = session;
  }

  public createUser = async (
    userBody: USER.CREATE_BODY = this.request.body
  ) => {
    try {
      return await this.userRepository.create<USER.CREATE_BODY>(userBody);
    } catch (err) {
      throw errorHandler(err);
    }
  };

  public getUserById = async (id: ID = this.request.params.id) => {
    try {
      const user = await this.userRepository.findById(id);

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

  public getUsers = async () => {
    return await this.userRepository.findAll();
  };

  public deleteUser = async (id: ID = this.request.params.id) => {
    try {
      const result = await this.userRepository.delete(id);
      const isSuccess = result === 1;
      if (!isSuccess) {
        throw new RequestError({
          status: 404,
          message: "User not found",
          data: {},
        });
      }
      return result;
    } catch (err) {
      throw errorHandler(err);
    }
  };

  // updateUser = (id: ID, user: USER.ENTITY) => userDAO.updateUser(id, user);
}

export default UserService;
