import { z } from "zod";

export const getTaskTemplateParamsValidatorSchema = z.object({
  id: z.uuid()
});

export type IGetTaskTemplateParamsValidatorSchema = z.infer<
  typeof getTaskTemplateParamsValidatorSchema
>;
