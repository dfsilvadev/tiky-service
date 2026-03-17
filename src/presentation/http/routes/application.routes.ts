import { app } from "../../server/app";

import { accountRoutes } from "./account.routes";
import { healthRoutes } from "./health.routes";

export async function applicationRoutes() {
  app.register(accountRoutes);
  app.register(healthRoutes);
}
