import { type FastifyReply, type FastifyRequest } from "fastify";

import { toHttpResponse } from "../../../../shared/utils/http-error-mapper";

import {
  approvalTaskTemplateBodyValidatorSchema,
  approvalTaskTemplateParamsValidatorSchema
} from "../../validators/approval-task-template.validator";

import {
  HTTP_STATUS_SUCCESS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES
} from "../../../../shared/constants/success.constants";

import { type ApprovalTaskTemplateUseCase } from "../../../../application/use-cases/task-template/approval-task-template.use-case";
import { type IController } from "../../../../domain/entities/controller.entity";

export class ApprovalTaskTemplateController implements IController {
  constructor(
    private readonly _approvalTaskTemplateUseCase: ApprovalTaskTemplateUseCase
  ) {}

  async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { familySub: familyId } = request.user.account;
      const { id } = approvalTaskTemplateParamsValidatorSchema.parse(
        request.params
      );
      const { weight } = approvalTaskTemplateBodyValidatorSchema.parse(
        request.body
      );

      const { approvedTaskTemplate } =
        await this._approvalTaskTemplateUseCase.execute({
          templateId: id,
          familyId,
          weight
        });

      reply.status(HTTP_STATUS_SUCCESS.OK).send({
        statusCode: HTTP_STATUS_SUCCESS.OK,
        details: {
          code: SUCCESS_CODES.TASK_TEMPLATE_APPROVED,
          message: SUCCESS_MESSAGES.TASK_TEMPLATE_APPROVED,
          data: approvedTaskTemplate
        }
      });
    } catch (error) {
      const { statusCode, details } = toHttpResponse(error);
      reply.status(statusCode).send(details);
    }
  }
}
