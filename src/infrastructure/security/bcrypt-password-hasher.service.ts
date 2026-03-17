import bcrypt from "bcryptjs";

import { AppError } from "../../domain/errors";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_ERROR
} from "../../shared/constants/error.constants";
import { logger } from "../logger";

import { type IEncryptionService } from "../../domain/services/password-hasher.service";

export class BcryptEncryptionService implements IEncryptionService {
  constructor(private readonly _saltRounds: number) {}

  async hash(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, this._saltRounds);

      logger.info("[PasswordHasher] Password hashed successfully");
      return hashedPassword;
    } catch (error) {
      logger.error("[PasswordHasher] Error hashing password", { error });

      throw new AppError(
        ERROR_MESSAGES.PASSWORD_HASHING_ERROR,
        HTTP_STATUS_ERROR.INTERNAL_SERVER_ERROR,
        ERROR_CODES.PASSWORD_HASHING_ERROR,
        undefined,
        false
      );
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);

      logger.info("[PasswordHasher] Password comparison completed", {
        isMatch
      });
      return isMatch;
    } catch (error) {
      logger.error("[PasswordHasher] Error comparing password", { error });

      throw new AppError(
        ERROR_MESSAGES.PASSWORD_COMPARISON_ERROR,
        HTTP_STATUS_ERROR.INTERNAL_SERVER_ERROR,
        ERROR_CODES.PASSWORD_COMPARISON_ERROR,
        undefined,
        false
      );
    }
  }
}
