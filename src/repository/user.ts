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

  async create<T>(user: T) {
    return await this.user.query().insert(user).returning("*");
  }

  // delete(id: ID): Promise<boolean> {
  //   throw new Error("Method not implemented.");
  // }

  async findById(id: ID) {
    return await this.user.query().findById(id).returning("*");
  }

  async findOne(key: string, value: any): Promise<User> {
    return await this.user
      .query()
      .findOne({ [key]: value })
      .returning("*");
  }

  async findAll() {
    return await this.user.query();
  }

  async delete(id: ID) {
    return this.user.query().findById(id).del();
  }

  updateUser = async (id: ID, user: User) => {
    const { firstName, lastName, email } = user;
    return await User.query()
      .where("id", id)
      .update({ firstName, lastName, email });
  };
}

export default UserRepository;
