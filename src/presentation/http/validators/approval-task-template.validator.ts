import { z } from "zod";

import { Weight } from "../../../generated/prisma/client";

export const approvalTaskTemplateParamsValidatorSchema = z.object({
  id: z.uuid()
});

export const approvalTaskTemplateBodyValidatorSchema = z.object({
  weight: z.enum(Weight)
});

export type IApprovalTaskTemplateParamsValidatorDTO = z.infer<
  typeof approvalTaskTemplateParamsValidatorSchema
>;

export type IApprovalTaskTemplateBodyValidatorDTO = z.infer<
  typeof approvalTaskTemplateBodyValidatorSchema
>;
