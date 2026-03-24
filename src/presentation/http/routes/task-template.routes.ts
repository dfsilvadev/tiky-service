import { FastifyInstance } from "fastify";

import { routerAdapter } from "../adapters/router.adapter";

import { verifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";
import { verifyRoleMiddleware } from "../middlewares/verify-role.middleware";

import { makeCreateTaskTemplateController } from "../../factories/make-create-task-template.controller";
import { makeDeleteTaskTemplateController } from "../../factories/make-delete-task-template.controller";
import { makeFetchTaskTemplatesController } from "../../factories/make-fetch-task-templates.controller";
import { makeGetTaskTemplateController } from "../../factories/make-get-task-template.controller";
import { makeUpdateTaskTemplateController } from "../../factories/make-update-task-template.controller";

export async function taskTemplateRoutes(app: FastifyInstance) {
  /**
   * All routes in this module require authentication.
   */
  app.addHook("onRequest", verifyJwtMiddleware);

  /**
   * Only users with the "ADMIN" role can create, update, or delete task templates.
   */
  app.addHook("preHandler", verifyRoleMiddleware(["ADMIN"]));

  /**
   * Task Template Routes
   */
  app.post(
    "/task-templates",
    routerAdapter(makeCreateTaskTemplateController())
  );
  app.get("/task-templates", routerAdapter(makeFetchTaskTemplatesController()));
  app.get(
    "/task-templates/:id",
    routerAdapter(makeGetTaskTemplateController())
  );
  app.put(
    "/task-templates/:id",
    routerAdapter(makeUpdateTaskTemplateController())
  );
  app.delete(
    "/task-templates/:id",
    routerAdapter(makeDeleteTaskTemplateController())
  );
}
