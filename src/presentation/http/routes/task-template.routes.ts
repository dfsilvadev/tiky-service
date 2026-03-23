import { FastifyInstance } from "fastify";

import { routerAdapter } from "../adapters/router.adapter";

import { verifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";
import { verifyRoleMiddleware } from "../middlewares/verify-role.middleware";

import { makeCreateTaskTemplateController } from "../../factories/make-create-task-template.controller";
import { makeFetchTaskTemplatesController } from "../../factories/make-fetch-task-templates.controller";

export async function taskTemplateRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwtMiddleware);
  app.addHook("preHandler", verifyRoleMiddleware(["ADMIN"]));
  app.post(
    "/task-templates",
    routerAdapter(makeCreateTaskTemplateController())
  );
  app.get("/task-templates", routerAdapter(makeFetchTaskTemplatesController()));
}
