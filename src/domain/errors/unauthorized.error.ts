import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";

import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
  constructor(
    message: string = ERROR_MESSAGES.UNAUTHORIZED,
    details?: Record<string, any>,
    expose: boolean = true
  ) {
    super(
      message,
      HTTP_STATUS_ERROR.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      details,
      expose
    );
  }
}
