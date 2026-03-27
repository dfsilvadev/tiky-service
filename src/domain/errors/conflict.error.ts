import { AppError } from "./app.error";

import {
  ERROR_CODES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";

export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(
      message,
      HTTP_STATUS_ERROR.CONFLICT,
      ERROR_CODES.CONFLICT_ERROR,
      details,
      true
    );
  }
}
