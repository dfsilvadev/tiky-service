import { type FastifyReply, type FastifyRequest } from "fastify";

import { type IController } from "../../../domain/entities/controller.entity";

export function routerAdapter(controller: IController) {
  return async function handler(request: FastifyRequest, reply: FastifyReply) {
    return controller.handler(request, reply);
  };
}
