import { type FastifyInstance } from "fastify";

import { SignInUseCase } from "../../application/use-cases/auth/sign-in.use-case";

import { makeAccountRepository } from "./make-account.repository";
import { makePasswordHasher } from "./make-password-hasher";
import { makeSessionRepository } from "./make-session.repository";
import { makeTokenService } from "./make-token.service";

export function makeSignInUseCase(app: FastifyInstance) {
  const accountRepository = makeAccountRepository();
  const passwordHasher = makePasswordHasher();
  const tokenService = makeTokenService(app);
  const sessionRepository = makeSessionRepository();

  return new SignInUseCase(
    accountRepository,
    passwordHasher,
    tokenService,
    sessionRepository
  );
}
