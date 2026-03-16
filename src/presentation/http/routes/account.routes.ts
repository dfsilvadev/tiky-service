import { FastifyInstance } from "fastify";

import { makeSignUpController } from "../../factories/make-sign-up.controller";
import { routerAdapter } from "../adapters/router.adapter";

export async function accountRoutes(app: FastifyInstance) {
  app.post("/accounts/sign-up", routerAdapter(makeSignUpController()));
}
