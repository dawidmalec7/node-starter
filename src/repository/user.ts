import User from "model/user";
import { ID } from "types/commons";
import knex from "knex";
import { BaseRepository } from "libs/base-repository";
import { USER } from "types/user";

interface UserRepositoryDependencies {
  user: typeof User;
}
class UserRepository extends BaseRepository<User> {
  private user: typeof User;

  constructor({ user }: UserRepositoryDependencies) {
    super();
    this.user = user;
  }

  async create<T>(user: T): Promise<User> {
    return await this.user.query().insert(user).returning("*");
  }

  async findById(id: ID): Promise<User> {
    return await this.user.query().findById(id).returning("*");
  }

  async findOne(key: string, value: any): Promise<User> {
    return await this.user
      .query()
      .findOne({ [key]: value })
      .returning(["id", "firstName", "lastName", "phone", "email"]);
  }

  async findAll(): Promise<User[]> {
    return await this.user
      .query()
      .returning(["id", "firstName", "lastName", "phone", "email"]);
  }

  async delete(id: ID): Promise<number> {
    return await this.user.query().deleteById(id);
  }

  async update<T>(id: ID, user: T): Promise<User> {
    return await this.user.query().updateAndFetchById(id, user);
  }
}

export default UserRepository;
