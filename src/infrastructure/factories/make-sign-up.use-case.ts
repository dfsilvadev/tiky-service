import { SignUpUseCase } from "../../application/use-cases/account/sign-up.use-case";

import { makeAccountRepository } from "./make-account.repository";
import { makePasswordHasher } from "./make-password-hasher";

export function makeSignUpUseCase() {
  const accountRepository = makeAccountRepository();
  const passwordHasher = makePasswordHasher();

  return new SignUpUseCase(accountRepository, passwordHasher);
}
