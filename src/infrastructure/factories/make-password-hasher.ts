import { BcryptPasswordHasherService } from "../security/bcrypt-password-hasher.service";

import { env } from "../../shared/config/env";

export function makePasswordHasher() {
  return new BcryptPasswordHasherService(env.PASSWORD_SALT_ROUNDS);
}
