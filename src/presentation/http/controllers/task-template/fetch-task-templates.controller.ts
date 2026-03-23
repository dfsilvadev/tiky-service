import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { fetchTaskTemplatesQueryValidatorSchema } from "../../validators/fetch-task-templates.validator";

import { type FastifyReply, type FastifyRequest } from "fastify";
import { type FetchTaskTemplatesUseCase } from "../../../../application/use-cases/task-template/fetch-task-templates.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";
import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

export class FetchTaskTemplatesController implements IController {
  constructor(
    private readonly _fetchTaskTemplatesUseCase: FetchTaskTemplatesUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { familySub: familyId } = request.user.account;
      const { page, limit, status, order } =
        fetchTaskTemplatesQueryValidatorSchema.parse(request.query);

      const { items, meta } = await this._fetchTaskTemplatesUseCase.execute(
        familyId,
        {
          page,
          limit,
          status,
          order
        }
      );

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.RESOURCES_RETRIEVED,
          message: SUCCESS_MESSAGES.RESOURCES_RETRIEVED,
          data: {
            items,
            meta
          }
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      return reply.status(statusCode).send(details);
    }
  }
}
