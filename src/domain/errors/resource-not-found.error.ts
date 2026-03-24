import { AppError } from "./app.error";

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";

export class ResourceNotFoundError extends AppError {
  constructor(details: string) {
    super(
      ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      HTTP_STATUS_ERROR.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      { details },
      true
    );
  }
}
