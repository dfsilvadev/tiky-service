import { z } from "zod";

import { Role } from "../../../generated/prisma/enums";

export const signUpValidatorSchema = z.object({
  name: z.string().min(1, "Name is required. Please provide your name."),
  email: z.email("Invalid email address. Please provide a valid email."),
  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters long. Please provide a stronger password."
    ),
  role: z
    .enum(Role, "Role must be either 'PLAYER' or 'ADMIN'")
    .default(Role.PLAYER),
  familyId: z.uuid(
    "Family ID must be a valid UUID. Please provide a family ID or remove this field to generate a new one."
  )
});

export type SignUpDTO = z.infer<typeof signUpValidatorSchema>;
