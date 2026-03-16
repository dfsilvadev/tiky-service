import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class InvalidTokenError extends AppError {
  constructor(message: string = ERROR_MESSAGES.INVALID_TOKEN) {
    super(message, HTTP_STATUS_ERROR.UNAUTHORIZED, ERROR_CODES.INVALID_TOKEN);
  }
}
