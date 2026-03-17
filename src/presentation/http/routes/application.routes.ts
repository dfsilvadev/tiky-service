import { FastifyInstance } from "fastify";

import { accountRoutes } from "./account.routes";
import { healthRoutes } from "./health.routes";

export async function applicationRoutes(app: FastifyInstance): Promise<void> {
  app.register(accountRoutes);
  app.register(healthRoutes);
}
