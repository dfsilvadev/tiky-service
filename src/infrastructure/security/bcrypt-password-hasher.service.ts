import bcrypt from "bcryptjs";

import { AppError } from "../../domain/errors";
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
        "Error hashing password",
        500,
        "PASSWORD_HASHING_ERROR",
        { originalError: error }
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
        "Error comparing password",
        500,
        "PASSWORD_COMPARISON_ERROR",
        { originalError: error }
      );
    }
  }
}
