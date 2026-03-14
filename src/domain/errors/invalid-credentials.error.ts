import { HTTP_STATUS } from "../../shared/constants/http-status";
import { AppError } from "./app.error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      "Invalid email or password",
      HTTP_STATUS.UNAUTHORIZED,
      "INVALID_CREDENTIALS"
    );
  }
}
