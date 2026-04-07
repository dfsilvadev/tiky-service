import {
  ERROR_CODES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class ResourceAlreadyExistsError extends AppError {
  constructor(templateId: string, message: string) {
    super(
      message,
      HTTP_STATUS_ERROR.CONFLICT,
      ERROR_CODES.ACCOUNT_ALREADY_EXISTS,
      { templateId }
    );
  }
}
