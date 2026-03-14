import { ERROR_CODES } from "../../shared/constants/error-codes";
import { HTTP_STATUS } from "../../shared/constants/http-status";
import { AppError } from "./app.error";

export class InvalidTokenError extends AppError {
  constructor(
    message: string = "Your session has expired or is invalid. Please log in again"
  ) {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN);
  }
}
