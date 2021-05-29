interface RequestErrorProps {
  status: number;
  message: string;
  data: any;
}

class RequestError extends Error implements RequestErrorProps {
  public status: RequestErrorProps["status"];
  public message: RequestErrorProps["message"];
  public data: RequestErrorProps["data"];

  constructor({ status, message, data }: RequestErrorProps) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static badRequest(message: string, data: any = {}) {
    return new RequestError({ status: 404, message, data });
  }

  static validation(message: string, data: any = {}) {
    return new RequestError({ status: 422, message, data });
  }

  static internal(message: string, data: any = {}) {
    return new RequestError({ status: 500, message, data });
  }
}
export default RequestError;
