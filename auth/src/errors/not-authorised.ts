import { CustomError } from "./custom-error";

export class NotAuthorisedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorised");

    Object.setPrototypeOf(this, NotAuthorisedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authorised" }];
  }
}
