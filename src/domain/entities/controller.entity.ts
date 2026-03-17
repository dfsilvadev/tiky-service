import { type FastifyReply, type FastifyRequest } from "fastify";

export interface IControllerHttpResponse<D = Record<string, unknown>> {
  readonly statusCode: number;
  readonly details: D;
}

export interface IStandardMessage {
  code: string;
  message: string;
}

export interface IDataMessage<T> extends IStandardMessage {
  data: T;
}

export interface IController {
  handler(_request: FastifyRequest, _reply: FastifyReply): Promise<void>;
}
