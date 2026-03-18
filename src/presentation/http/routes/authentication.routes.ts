import { type FastifyInstance } from "fastify";

import { makeRefreshTokenController } from "../../factories/make-refresh-token.controller";
import { makeSignInController } from "../../factories/make-sign-in.controller";

import { routerAdapter } from "../adapters/router.adapter";

export async function authenticationRoutes(
  app: FastifyInstance
): Promise<void> {
  app.post("/auth/sign-in", routerAdapter(makeSignInController(app)));
  app.post(
    "/auth/refresh-token",
    routerAdapter(makeRefreshTokenController(app))
  );
}
