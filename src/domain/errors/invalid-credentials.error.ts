import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      ERROR_MESSAGES.INVALID_CREDENTIALS,
      HTTP_STATUS_ERROR.UNAUTHORIZED,
      ERROR_CODES.INVALID_CREDENTIALS
    );
  }
}
