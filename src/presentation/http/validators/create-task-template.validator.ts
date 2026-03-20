import { z } from "zod";

import { RecurrenceType, Weight } from "../../../generated/prisma/client";

export const createTaskTemplateValidatorSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  weight: z.enum(Weight),
  isMandatory: z.boolean().default(true),
  recurrenceType: z.enum(RecurrenceType),
  recurrencePattern: z.string().optional(),
  scheduledFor: z.coerce.date().optional(),
  timeLimit: z.string().optional(),
  subtasks: z.array(z.string()).optional().default([])
});

export type CreateTaskTemplateDTO = z.infer<
  typeof createTaskTemplateValidatorSchema
>;
