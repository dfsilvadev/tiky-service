import { SignOutUseCase } from "../../application/use-cases/auth/sign-out.use-case";

import { makeSessionRepository } from "./make-session.repository";

export function makeSignOutUseCase() {
  const sessionRepository = makeSessionRepository();

  return new SignOutUseCase(sessionRepository);
}
