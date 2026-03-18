import { z } from "zod";

import { Role } from "../../../generated/prisma/enums";

export const signUpValidatorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z
    .enum(Role, "Role must be either 'PLAYER' or 'ADMIN'")
    .default(Role.PLAYER)
});

export type SignUpDTO = z.infer<typeof signUpValidatorSchema>;
