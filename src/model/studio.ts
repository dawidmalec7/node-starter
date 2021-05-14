import { Model } from "objection";
import User from "model/user";

class Studio extends Model {
  static get tableName() {
    return "studios";
  }
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "studios.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default Studio;
