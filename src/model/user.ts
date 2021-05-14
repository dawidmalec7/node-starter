import { Model, snakeCaseMappers } from "objection";
import Studio from "model/studio";
import userSchema from "schema/user.json";
import { ID } from "types/commons";
import QueryBuilder, { knex } from "knex";

class User extends Model {
  firstName?: string;
  lastName?: string;
  email: string;

  static get tableName() {
    return "users";
  }

  static columnNameMappers = snakeCaseMappers();

  static get relationMappings() {
    return {
      studios: {
        relation: Model.HasManyRelation,
        modelClass: Studio,
        join: {
          from: "users.id",
          to: "studios.user_id",
        },
      },
    };
  }

  static insert<T>(user: T): Promise<knex.QueryBuilder> {
    return User.query().insert(user).returning("*");
  }

  static findById<T>(id: ID): Promise<knex.QueryBuilder> {
    return User.query().findById(id).returning("*");
  }

  static findOne<T>(...args: any[]): Promise<knex.QueryBuilder> {
    return User.query().findOne(args).returning("*");
  }

  // static get jsonSchema() {
  //   return userSchema;
  // }
}

export default User;
