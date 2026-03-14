import { HTTP_STATUS } from "../../shared/constants/http-status";
import { AppError } from "./app.error";

export class AccountAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(
      `An account with email ${email} already exists`,
      HTTP_STATUS.CONFLICT,
      "ACCOUNT_ALREADY_EXISTS",
      { email }
    );
  }
}
