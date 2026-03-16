import {
  ERROR_CODES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { AppError } from "./app.error";

export class AccountAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      `An account with email ${email} already exists`,
      HTTP_STATUS_ERROR.CONFLICT,
      ERROR_CODES.ACCOUNT_ALREADY_EXISTS,
      { email }
    );
  }
}
