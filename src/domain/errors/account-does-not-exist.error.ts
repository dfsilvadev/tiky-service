import { HTTP_STATUS } from "../../shared/constants/http-status";
import { AppError } from "./app.error";

export class AccountDoesNotExistError extends AppError {
  constructor(accountId: string) {
    super(
      "The specified account does not exist.",
      HTTP_STATUS.NOT_FOUND,
      "ACCOUNT_NOT_FOUND",
      { accountId }
    );
  }
}
