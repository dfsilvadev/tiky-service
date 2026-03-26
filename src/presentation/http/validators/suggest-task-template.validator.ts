import { z } from "zod";

export const suggestTaskTemplateValidatorSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  timeLimit: z.string().optional()
});

export type SuggestTaskTemplateDTO = z.infer<
  typeof suggestTaskTemplateValidatorSchema
>;
