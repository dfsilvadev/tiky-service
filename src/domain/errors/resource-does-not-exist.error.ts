import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class ResourceDoesNotExistError extends AppError {
  constructor(resourceId: string) {
    super(
      ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      HTTP_STATUS_ERROR.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      { resourceId }
    );
  }
}
