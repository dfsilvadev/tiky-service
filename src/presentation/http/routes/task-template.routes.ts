import { FastifyInstance } from "fastify";

import { routerAdapter } from "../adapters/router.adapter";

import { verifyJwtMiddleware } from "../middlewares/verify-jwt.middleware";
import { verifyRoleMiddleware } from "../middlewares/verify-role.middleware";

import { makeApprovalTaskTemplateController } from "../../factories/make-approval-task-template.controller";
import { makeCreateTaskTemplateController } from "../../factories/make-create-task-template.controller";
import { makeDeleteTaskTemplateController } from "../../factories/make-delete-task-template.controller";
import { makeFetchTaskTemplatesController } from "../../factories/make-fetch-task-templates.controller";
import { makeGetTaskTemplateController } from "../../factories/make-get-task-template.controller";
import { makeSuggestTaskTemplateController } from "../../factories/make-suggest-task-template.controller";
import { makeUpdateTaskTemplateController } from "../../factories/make-update-task-template.controller";

export async function taskTemplateRoutes(app: FastifyInstance) {
  /**
   * [FILE GLOBAL HOOK]
   * Every route in this module requires the user to be authenticated.
   */
  app.addHook("onRequest", verifyJwtMiddleware);

  /**
   * ADMIN CONTEXT
   */
  app.register(async function adminRoutes(adminApp: FastifyInstance) {
    adminApp.addHook("preHandler", verifyRoleMiddleware(["ADMIN"]));

    adminApp.post(
      "/task-templates",
      routerAdapter(makeCreateTaskTemplateController())
    );
    adminApp.get(
      "/task-templates",
      routerAdapter(makeFetchTaskTemplatesController())
    );
    adminApp.get(
      "/task-templates/:id",
      routerAdapter(makeGetTaskTemplateController())
    );
    adminApp.put(
      "/task-templates/:id",
      routerAdapter(makeUpdateTaskTemplateController())
    );
    adminApp.patch(
      "/task-templates/:id/approve-suggestion",
      routerAdapter(makeApprovalTaskTemplateController())
    );
    adminApp.delete(
      "/task-templates/:id",
      routerAdapter(makeDeleteTaskTemplateController())
    );
  });

  /**
   * PLAYER CONTEXT
   */
  app.register(async function playerRoutes(playerApp: FastifyInstance) {
    playerApp.addHook("preHandler", verifyRoleMiddleware(["PLAYER"]));

    playerApp.post(
      "/task-templates/suggest",
      routerAdapter(makeSuggestTaskTemplateController())
    );
  });
}
