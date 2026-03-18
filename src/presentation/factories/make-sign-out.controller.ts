import { makeSignOutUseCase } from "../../infrastructure/factories/make-sign-out.use-case";

import { SignOutController } from "../http/controllers/auth/sign-out.controller";

export function makeSignOutController() {
  const signOutUseCase = makeSignOutUseCase();

  return new SignOutController(signOutUseCase);
}
