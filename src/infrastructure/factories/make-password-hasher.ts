import { BcryptEncryptionService } from "../security/bcrypt-password-hasher.service";

import { env } from "../../shared/config/env";

export function makePasswordHasher() {
  return new BcryptEncryptionService(env.PASSWORD_SALT_ROUNDS);
}
