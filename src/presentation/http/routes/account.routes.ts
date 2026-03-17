import { type FastifyInstance } from "fastify";

import { makeSignUpController } from "../../factories/make-sign-up.controller";

import { routerAdapter } from "../adapters/router.adapter";

export async function accountRoutes(app: FastifyInstance): Promise<void> {
  app.post("/auth/sign-up", routerAdapter(makeSignUpController()));
}
