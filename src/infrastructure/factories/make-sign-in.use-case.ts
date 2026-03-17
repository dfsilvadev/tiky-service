import { SignInUseCase } from "../../application/use-cases/auth/sign-in.use-case";

import { makeAccountRepository } from "./make-account.repository";
import { makePasswordHasher } from "./make-password-hasher";

export function makeSignInUseCase() {
  const accountRepository = makeAccountRepository();
  const passwordHasher = makePasswordHasher();

  return new SignInUseCase(accountRepository, passwordHasher);
}
