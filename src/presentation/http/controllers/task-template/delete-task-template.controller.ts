import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { deleteTaskTemplateParamsValidatorSchema } from "../../validators/delete-task-template.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type DeleteTaskTemplateUseCase } from "../../../../application/use-cases/task-template/delete-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class DeleteTaskTemplateController implements IController {
  constructor(
    private readonly _deleteTaskTemplateUseCase: DeleteTaskTemplateUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { familySub: familyId } = request.user.account;
      const { id } = deleteTaskTemplateParamsValidatorSchema.parse(
        request.params
      );

      const deletedTaskTemplate = await this._deleteTaskTemplateUseCase.execute(
        {
          id,
          familyId
        }
      );

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.RESOURCE_DELETED,
          message: SUCCESS_MESSAGES.RESOURCE_DELETED,
          data: deletedTaskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
