import { FastifyInstance } from "fastify";

import { accountRoutes } from "./account.routes";
import { authenticationRoutes } from "./authentication.routes";
import { familyRoutes } from "./family.routes";
import { healthRoutes } from "./health.routes";

export async function applicationRoutes(app: FastifyInstance): Promise<void> {
  app.register(healthRoutes);
  app.register(accountRoutes);
  app.register(familyRoutes);
  app.register(authenticationRoutes);
}
