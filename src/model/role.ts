import { Model, snakeCaseMappers } from "objection";
import tableNames from "constants/table-names";
import User from "./user";

class Role extends Model {
  static get tableName() {
    return tableNames.roles;
  }

  static columnNameMappers = snakeCaseMappers();

  static get relationMappings() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "roles.id",
          to: "users.id",
        },
      },
    };
  }
}

export default Role;
