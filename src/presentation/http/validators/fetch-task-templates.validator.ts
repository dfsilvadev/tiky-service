import { z } from "zod";

import { TemplateStatus } from "../../../generated/prisma/client";

export const fetchTaskTemplatesQueryValidatorSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(TemplateStatus).optional(),
  order: z.enum(["asc", "desc"]).default("desc")
});

export type IFetchTaskTemplatesQueryValidatorSchema = z.infer<
  typeof fetchTaskTemplatesQueryValidatorSchema
>;
