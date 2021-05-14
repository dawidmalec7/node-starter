import User from "model/user";
import { ID } from "types/commons";
import { USER } from "types/user";
import knex from "knex";

class UserRepository {
  private user: any;

  constructor({ user }: any) {
    this.user = user;
  }

  insert<T>(user: T): Promise<knex.QueryBuilder> {
    return this.user.query().insert(user).returning("*");
  }

  async findById<T>(id: ID): Promise<knex.QueryBuilder> {
    return await this.user.query().findById(Number(id)).returning("*");
  }

  findOne<T>(...args: any[]): Promise<knex.QueryBuilder> {
    return User.query().findOne(args).returning("*");
  }

  deleteUser = async (id: ID) => await User.query().where("id", id).del();

  updateUser = async (id: ID, user: User) => {
    const { firstName, lastName, email } = user;
    return await User.query()
      .where("id", id)
      .update({ firstName, lastName, email });
  };
}

export default UserRepository;
