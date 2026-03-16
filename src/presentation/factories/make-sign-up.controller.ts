import { SignUpController } from "../http/controllers/account/sign-up.controller";

import { makeSignUpUseCase } from "../../infrastructure/factories/make-sign-up.use-case";

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
}
