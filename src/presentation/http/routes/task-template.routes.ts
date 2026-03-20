import { FastifyInstance } from "fastify";

import { routerAdapter } from "../adapters/router.adapter";

import { verifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";

import { makeCreateTaskTemplateController } from "../../factories/make-create-task-template.controller";
import { verifyRoleMiddleware } from "../middlewares/verify-role.middleware";

export async function taskTemplateRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtMiddleware);
  app.post(
    "/task-templates",
    { preHandler: [verifyRoleMiddleware(["ADMIN"])] },
    routerAdapter(makeCreateTaskTemplateController())
  );
}
