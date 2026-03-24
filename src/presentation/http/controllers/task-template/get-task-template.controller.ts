import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { getTaskTemplateParamsValidatorSchema } from "../../validators/get-task-template.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type GetTaskTemplateUseCase } from "../../../../application/use-cases/task-template/get-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class GetTaskTemplateController implements IController {
  constructor(
    private readonly _getTaskTemplateUseCase: GetTaskTemplateUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { familySub: familyId } = request.user.account;
      const { id } = getTaskTemplateParamsValidatorSchema.parse(request.params);

      const { taskTemplate } = await this._getTaskTemplateUseCase.execute(
        id,
        familyId
      );

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.RESOURCES_RETRIEVED,
          message: SUCCESS_MESSAGES.RESOURCES_RETRIEVED,
          data: {
            taskTemplate
          }
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      return reply.status(statusCode).send(details);
    }
  }
}
