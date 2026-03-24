import { z } from "zod";

export const deleteTaskTemplateParamsValidatorSchema = z.object({
  id: z.uuid()
});

export type DeleteTaskTemplateParamsValidatorDTO = z.infer<
  typeof deleteTaskTemplateParamsValidatorSchema
>;
