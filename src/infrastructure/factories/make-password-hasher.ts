import { BcryptEncryptionService } from "../security/bcrypt-encryption.service";

import { env } from "../../shared/config/env";

export function makePasswordHasher() {
  return new BcryptEncryptionService(env.PASSWORD_SALT_ROUNDS);
}
