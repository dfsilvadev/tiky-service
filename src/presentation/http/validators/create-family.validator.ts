import { z } from "zod";

export const createFamilyValidatorSchema = z.object({
  name: z.string().min(1, "Family name is required"),
  description: z.string().optional()
});

export type CreateFamilyDTO = z.infer<typeof createFamilyValidatorSchema>;
