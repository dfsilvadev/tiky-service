import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class AccountDoesNotExistError extends AppError {
  constructor(accountId: string) {
    super(
      ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
      HTTP_STATUS_ERROR.NOT_FOUND,
      ERROR_CODES.ACCOUNT_NOT_FOUND,
      { accountId }
    );
  }
}
