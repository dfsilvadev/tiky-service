import { type FastifyInstance } from "fastify";

import { SignInController } from "../http/controllers/auth/sign-in.controller";

import { makeSignInUseCase } from "../../infrastructure/factories/make-sign-in.use-case";

export function makeSignInController(app: FastifyInstance) {
  const signInUseCase = makeSignInUseCase(app);
  const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

  return new SignInController(signInUseCase, COOKIE_MAX_AGE);
}
