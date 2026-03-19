import { type FastifyInstance } from "fastify";

import { routerAdapter } from "../adapters/router.adapter";

import { makeCreateFamilyController } from "../../factories/make-create-family.controller";

export async function familyRoutes(app: FastifyInstance) {
  app.post("/families", routerAdapter(makeCreateFamilyController()));
}
