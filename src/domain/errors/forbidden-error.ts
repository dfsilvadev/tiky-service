import {
  ERROR_CODES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class ForbiddenError extends AppError {
  constructor(message = "Access Denied", details?: unknown) {
    super(
      message,
      HTTP_STATUS_ERROR.FORBIDDEN,
      ERROR_CODES.FORBIDDEN,
      details,
      true
    );
  }
}
