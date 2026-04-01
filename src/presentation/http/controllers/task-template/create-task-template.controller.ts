import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import { CheckAndGenerateTodayInstanceService } from "../../../../application/services/check-and-generate-today-instance.service";

import { createTaskTemplateValidatorSchema } from "../../validators/create-task-template.validator";

import { type CreateTaskTemplateUseCase } from "../../../../application/use-cases/task-template/create-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";
import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

export class CreateTaskTemplateController implements IController {
  constructor(
    private readonly _createTaskTemplateUseCase: CreateTaskTemplateUseCase,
    private readonly _checkAndGenerateTodayInstanceService: CheckAndGenerateTodayInstanceService
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const {
        sub,
        account: { familySub }
      } = request.user;
      const dto = createTaskTemplateValidatorSchema.parse(request.body);

      const { createdTaskTemplate } =
        await this._createTaskTemplateUseCase.execute({
          ...dto,
          accountId: sub,
          familyId: familySub
        });

      await this._checkAndGenerateTodayInstanceService.execute({
        template: createdTaskTemplate,
        playerId: dto.playerId
      });

      reply.status(HTTP_STATUS_SUCCESS.CREATED).send({
        statusCode: HTTP_STATUS_SUCCESS.CREATED,
        details: {
          code: SUCCESS_CODES.RESOURCE_CREATED,
          message: SUCCESS_MESSAGES.RESOURCE_CREATED,
          data: createdTaskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
