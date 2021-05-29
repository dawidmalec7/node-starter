import { Model, snakeCaseMappers } from "objection";
import Studio from "model/studio";
import tableNames from "constants/table-names";
import { ID } from "types/commons";
import Role from "model/role";

class User extends Model {
  id?: ID;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;

  static get tableName() {
    return tableNames.users;
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
      roles: {
        relation: Model.HasManyRelation,
        modelClass: Role,
        join: {
          from: "users.id",
          to: "roles.id",
        },
      },
    };
  }
}

export default User;
