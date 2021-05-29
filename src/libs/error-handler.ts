import RequestError from "model/request-error";

const {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require("objection");

function errorHandler(err: any) {
  if (err instanceof RequestError) {
    return err;
  }

  if (err instanceof ValidationError) {
    switch (err.type) {
      case "ModelValidation":
        return new RequestError({
          status: 400,
          message: err.message,
          data: err.data,
        });
      case "RelationExpression":
        return new RequestError({
          status: 400,
          message: err.message,
          data: {},
        });
        break;
      case "UnallowedRelation":
        return new RequestError({
          status: 400,
          message: err.message,
          data: {},
        });
        break;
      case "InvalidGraph":
        return new RequestError({
          status: 400,
          message: err.message,
          data: {},
        });
      default:
        return new RequestError({
          status: 400,
          message: err.message,
          data: {},
        });
    }
  } else if (err instanceof NotFoundError) {
    return new RequestError({
      status: 404,
      message: err.message,
      data: {},
    });
  } else if (err instanceof UniqueViolationError) {
    return new RequestError({
      status: 409,
      message: err.message,
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof NotNullViolationError) {
    return new RequestError({
      status: 400,
      message: err.message,
      data: {
        column: err.column,
        table: err.table,
      },
    });
  } else if (err instanceof ForeignKeyViolationError) {
    return new RequestError({
      message: err.message,
      status: 409,
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof CheckViolationError) {
    return new RequestError({
      status: 400,
      message: err.message,
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof DataError) {
    return new RequestError({
      status: 400,
      message: err.message,
      data: {},
    });
  } else if (err instanceof DBError) {
    return new RequestError({
      status: 500,
      message: err.message,
      data: {},
    });
  } else {
    return new RequestError({
      status: 500,
      message: err.message,
      data: {},
    });
  }
}

export default errorHandler;
